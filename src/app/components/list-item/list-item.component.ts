import { Component, DestroyRef, inject, Input } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ItemInterface } from '../../model/itemInterface';
import { NgFor, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
})
export class ListItemComponent {
  itemService = inject(ItemService);

  @Input() locationOfForm = 'item';

  items: ItemInterface[] | any = [];

  selectedItem: ItemInterface | null = null;

  constructor() {
    this.itemService.items$.pipe(takeUntilDestroyed()).subscribe((itemList) => {
      this.items = itemList;
    });
    this.itemService.selectedItem$
      .pipe(takeUntilDestroyed())
      .subscribe((selectedItem) => {
        this.selectedItem = selectedItem;
      });
  }

  deleteItem(itemId: number): void {
    this.itemService.deleteItem(itemId);
  }

  selectItem(i: number): void {
    this.itemService.selectItem(i);
  }
}
