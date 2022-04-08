import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookFactory } from '../shared/book-factory';
import { BookStoreService } from '../shared/book-store.service';
import { BookFormErrorMessages } from './book-form-error-messages';

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

    this.buildThumbnailsArray();
    this.bookForm = this.fb.group({
      id: this.book.id, 
      title: [this.book.title, Validators.required], 
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
      images: this.images,
      published: [this.book.published, Validators.required]
    });

    this.bookForm.statusChanges.subscribe(() => 
      this.updateErrorMessages()
    )
  }


  addThumbnailControl() {
    this.images.push(this.fb.group({ id: 0, url: null, title: null}));
  }

  buildThumbnailsArray() {
    if (this.book.images) {
      this.images = this.fb.array([]);
      for (let img of this.book.images) {
        let fg = this.fb.group({
          id: new FormControl(img.id),
          url: new FormControl(img.url, [Validators.required]),
          title: new FormControl(img.title, [Validators.required])
        });
        this.images.push(fg);
      }
    }
  }


  updateErrorMessages() {
    console.log("Is invalid? " + this.bookForm.invalid);
    this.errors = {};

    for (const message of BookFormErrorMessages) {
      const control = this.bookForm.get(message.forControl);
      if (

        control && 
        control.dirty && 
        control.invalid && control.errors && 
        control.errors[message.forValidator] && 
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      } 
    }  

  
  }



  submitForm() {
    this.bookForm.value.images = this.bookForm.value.images.filter(
      (thumbnail: { url: string; }) => thumbnail.url
    );

    const book: Book = BookFactory.fromObject(this.bookForm.value);  

    book.authors = this.book.authors;

    if (this.isUpdatingBook) {
      this.bs.update(book).subscribe(res => {
        this.router.navigate(['../../books', book.isbn], {
          relativeTo: this.route
        });

      });
    }
  }

}
