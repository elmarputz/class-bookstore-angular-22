import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: [
  ]
})
export class BookDetailsComponent implements OnInit {

  @Input() book: Book | undefined; 
  @Output() showListEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  getRating(num: number) {
    return new Array(num); 
   }


   showBookList() {
     this.showListEvent.emit();
   }

}
