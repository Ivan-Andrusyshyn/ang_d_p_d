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
    name: ['', Validators.required],
    color: [''],
  });

  addItem() {
    if (this.isAddingItem()) {
      this.addItemToList();
    }
    if (this.isAddingComment()) {
      this.addCommentToSelectedItem();
    }
    this.itemForm.reset();
  }

  private addItemToList() {
    const itemName = this.itemForm.get('name')?.value;
    const newItem: ItemInterface = {
      id: this.itemService.items$.value.length + 1,
      name: itemName,
      comments: [],
    };
    this.itemService.addItem(newItem);
    this.itemService.selectItem(0);
  }

  private addCommentToSelectedItem() {
    const itemName = this.itemForm.get('name')?.value;
    const commentColor = this.itemForm.get('color')?.value || '#040404';
    const commentLength = this.itemService.selectedItem.value.comments.length;
    const newComment: CommentInterface = {
      id: commentLength + 1,
      name: itemName,
      color: commentColor,
    };
    this.itemService.addComment(newComment);
  }

  private isAddingComment(): boolean {
    return this.locationOfForm === 'comments' && this.itemForm.valid;
  }
  private isAddingItem(): boolean {
    return this.locationOfForm === 'items' && this.itemForm.valid;
  }
}
