import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ItemService } from '../../services/item.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentInterface } from '../../model/commentInterface';
import { ItemInterface } from '../../model/itemInterface';

@Component({
  selector: 'app-addform',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './addform.component.html',
  styleUrl: './addform.component.css',
})
export class AddformComponent {
  @Input() locationOfForm = 'item';

  private itemService = inject(ItemService);
  private fb = inject(FormBuilder);

  itemForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    color: [''],
  });

  addItem() {
    if (this.itemForm.invalid) {
      this.itemForm.setErrors({ incorrectType: true });
      return;
    }

    if (this.isAddingItem()) {
      this.addItemToList();
    } else {
      this.addCommentToSelectedItem();
    }
    this.itemForm.reset();
  }

  private addItemToList() {
    const itemName = this.itemForm.get('name')?.value.trim();
    if (!itemName) return;

    const itemId =
      this.itemService.items$.value.length + Math.random().toFixed(5);

    const newItem: ItemInterface = {
      id: Number(itemId),
      name: itemName,
      comments: [],
    };
    this.itemService.addItem(newItem);

    const firstItem = this.itemService.items$.value.length === 1;

    if (firstItem) {
      this.itemService.selectItem(0);
    }
  }

  private addCommentToSelectedItem() {
    const itemName = this.itemForm.get('name')?.value.trim();
    if (!itemName) return;

    const commentColor = this.itemForm.get('color')?.value || '#040404';
    const itemId = Number(
      this.itemService.selectedItem$.value?.comments.length +
        Math.random().toFixed(4)
    );

    const newComment: CommentInterface = {
      id: itemId + 1,
      name: itemName,
      color: commentColor,
    };
    this.itemService.addComment(newComment);
  }

  private isAddingItem(): boolean {
    return this.locationOfForm === 'items' && this.itemForm.valid;
  }
}
