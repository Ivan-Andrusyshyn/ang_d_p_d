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
    const itemName = this.itemForm.get('name')?.value;
    const commentColor = this.itemForm.get('color')?.value;
    if (this.isAddingItem()) {
      this.itemService.addItem(itemName);
    } else {
      const newItem: CommentInterface = {
        id: this.itemService.items$.value.length,
        name: itemName,
        color: commentColor || '#040404',
      };
      this.itemService.addComment(newItem);
    }
    this.itemForm.reset();
  }

  private isAddingItem(): boolean {
    return this.locationOfForm === 'items' && this.itemForm.valid;
  }
}
