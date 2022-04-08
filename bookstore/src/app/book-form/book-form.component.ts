import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookFactory } from '../shared/book-factory';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bs-book-form',
  templateUrl: './book-form.component.html',
  styles: [
  ]
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  book = BookFactory.empty();
  errors: {  [key: string]: string } = {};
  isUpdatingBook = false;
  images: FormArray;

  constructor(
    private fb: FormBuilder,
    private bs: BookStoreService,
    private route: ActivatedRoute, 
    private router: Router,
  ) {
    this.bookForm = this.fb.group({});
    this.images = this.fb.array([]);

   }

  ngOnInit(): void {
    const isbn = this.route.snapshot.params["isbn"];
    if (isbn) {
      this.isUpdatingBook = true;
      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
        this.initBook();
      });
    }

    this.initBook();

  }

  initBook() {

    this.bookForm = this.fb.group({
      id: this.book.id, 
      title: this.book.title,
      subtitle: this.book.subtitle, 
      isbn: [
        this.book.isbn, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13)
        ]
      ],
      description: this.book.description,
      rating:  [
        this.book.rating, [
          Validators.min(0),
          Validators.max(10)
        ]
      ],
      image: this.images,
      published: [this.book.published, Validators.required]
    });

    this.bookForm.statusChanges.subscribe(() => 
      this.updateErrorMessages()
    )

  
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.bookForm.invalid);
    this.errors = {};
  }

  submitForm() {
    
  }

}
