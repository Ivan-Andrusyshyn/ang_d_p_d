import { Component, inject, Input, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ItemInterface } from '../../model/itemInterface';
import { NgFor, NgIf } from '@angular/common';
import { CommentInterface } from '../../model/commentInterface';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
})
export class ListItemComponent implements OnInit {
  itemService = inject(ItemService);

  @Input() locationOfForm = '';

  items: ItemInterface[] = [];

  selectedItem: ItemInterface = this.items[0];
  comments: CommentInterface[] = [];

  ngOnInit(): void {
    this.itemService.items$.subscribe((itemList) => {
      this.items = itemList;
      if (this.items.length > 0) {
        this.selectedItem = this.items[0];
        this.comments = this.selectedItem.comments;
      }
    });
    this.itemService.selectedItem.subscribe((selectedItemIndex) => {
      if (selectedItemIndex < this.items.length) {
        this.selectedItem = this.items[selectedItemIndex];
        this.comments = this.selectedItem.comments;
      }
    });
  }
  deleteItem(itemId: number): void {
    this.itemService.deleteItem(itemId);
  }

  selectItem(i: number): void {
    this.itemService.selectItem(i);
    console.log(this.comments);
  }
}
