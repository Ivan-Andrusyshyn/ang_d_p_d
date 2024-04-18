import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemInterface } from '../model/itemInterface';
import { CommentInterface } from '../model/commentInterface';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items: ItemInterface[] = [];
  items$ = new BehaviorSubject<ItemInterface[]>(this.items);

  selectedItem = new BehaviorSubject<ItemInterface>(this.items[0]);
  constructor() {}

  selectItem(indexItem: number) {
    this.selectedItem.next(this.items[indexItem]);
  }

  deleteItem(id: number): void {
    const items = this.items.filter((item) => item.id !== id);

    this.items$.next([...items]);
    this.items = [...items];
  }

  addItem(newItem: ItemInterface): void {
    this.items.push(newItem);
    this.items$.next([...this.items]);
  }

  addComment(comment: CommentInterface): void {
    const itemIndex = this.items.findIndex(
      (item) => item.id === this.selectedItem.value.id
    );
    if (itemIndex !== -1) {
      this.items[itemIndex].comments.push(comment);
      this.items$.next([...this.items]);
    }
  }
}
