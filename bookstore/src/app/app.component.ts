import { Component } from '@angular/core';
import { Book } from './shared/book';

@Component({
  selector: 'bs-root',
  template: `
    <bs-book-list (showDetailsEvent)="showDetails($event)" *ngIf="listOn"></bs-book-list>
    <bs-book-details (showListEvent)="showList()" *ngIf="detailsOn"></bs-book-details>
    `
})
export class AppComponent {

  listOn = true;
  detailsOn = false;

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(book: Book) {
    this.book = book;
    this.listOn = false;
    this.detailsOn = true;
  }

  book : Book | undefined;

  title = 'bookstore';
}
