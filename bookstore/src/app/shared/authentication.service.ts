import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';


interface Token {
  exp: number;
  user: {
    if: string;
  }
}

@Injectable()
export class AuthenticationService {

  private api = 'https://bookstore22.putz.kwmhgb.at/api/auth';


  constructor(private http: HttpClient) {  }


  login(email: string, password: string) : Observable<any> {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

}
