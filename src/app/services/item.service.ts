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

  selectedItem$ = new BehaviorSubject<ItemInterface | null>(null);

  constructor() {
    this.getDataFromLocalStorage();

    window.addEventListener('beforeunload', () => {
      this.saveDataToLocalStorage();
    });
  }

  selectItem(indexItem: number) {
    this.selectedItem$.next(this.items[indexItem]);
  }

  deleteItem(id: number): void {
    const items = this.items.filter((item) => item.id !== id);

    this.items = [...items];
    this.items$.next(items);

    this.selectItem(this.items.length - 1);
  }

  addItem(newItem: ItemInterface): void {
    this.items.push(newItem);
    this.items$.next(this.items);
  }

  addComment(comment: CommentInterface): void {
    const selectedItemValue = this.selectedItem$.value;
    const itemIndex = this.items.findIndex(
      (item) => item.id === selectedItemValue?.id
    );

    if (itemIndex !== -1) {
      this.items[itemIndex].comments.push(comment);
      this.selectedItem$.next(this.items[itemIndex]);
    }
  }

  private getDataFromLocalStorage() {
    const storedItems = localStorage.getItem('items');
    const storedSelectedItem = localStorage.getItem('selectedItem');

    if (storedItems && storedSelectedItem) {
      this.items = JSON.parse(storedItems);
      const parsedSelectedItem = JSON.parse(storedSelectedItem);

      this.items$.next(this.items);
      this.selectedItem$.next(parsedSelectedItem);
    }
  }

  private saveDataToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(this.items));
    localStorage.setItem(
      'selectedItem',
      JSON.stringify(this.selectedItem$.value || null)
    );
  }
}
