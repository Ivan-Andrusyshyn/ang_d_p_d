import { CommonModule, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

interface UserInterface {
  id: string;
  name: string;
}

@Component({
  selector: 'app-work-with-signals',
  standalone: true,
  imports: [NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './work-with-signals.component.html',
  styleUrl: './work-with-signals.component.css',
})
export class WorkWithSignalsComponent {
  // users$ = new BehaviorSubject<UserInterface[]>([]);RXJS
  // userList$ = this.users$.asObservable();RXJS
  usersSig = signal<UserInterface[]>([]);

  userForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
    });
  }
  addUser() {
    if (this.userForm.invalid) {
      return;
    }
    const userName = this.userForm.get('userName')?.value;
    const user: UserInterface = {
      id: Math.random().toString(),
      name: userName,
    };
    this.usersSig.update((users) => [...users, user]);
    // const updatedUsers = [...this.users$.getValue(), user];RXJS
    // this.users$.next(updatedUsers);RXJS
    this.userForm.reset();
  }

  removeUser(userId: string): void {
    const updatedUsers = this.usersSig().filter((user) => user.id !== userId);
    this.usersSig.set(updatedUsers);
    // const updatedUsers = this.users$
    //   .getValue()
    //   .filter((user: any) => user.id !== userId);RXJS
    // this.users$.next(updatedUsers);RXJS
  }
}
