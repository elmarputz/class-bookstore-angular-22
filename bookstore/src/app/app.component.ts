import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { Book } from './shared/book';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  book : Book | undefined;

  listOn = true;
  detailsOn = false;

  constructor (private authService: AuthenticationService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
 
  getLoginLabel() {
    return this.isLoggedIn() ? "Log Out" : "Log In";
  }

  title = 'bookstore';
}
