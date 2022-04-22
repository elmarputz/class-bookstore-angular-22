import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';


interface Token {
  exp: number;
  user: {
    id: string;
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

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  public setSessionStorage(token: string) {
    console.log("storing token");
    console.log(jwt_decode(token));
    const decodedToken = jwt_decode(token) as Token;
    console.log(decodedToken);
    console.log(decodedToken.user.id);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);

  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    console.log("Logged out");
  }

  public isLoggedIn() {
    if (sessionStorage.getItem("token")) {
      let token : string = <string> sessionStorage.getItem("token");
      console.log(jwt_decode(token));
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log("token expired");
        sessionStorage.removeItem("token");
        return false;
      } 
      return true;
    } else {
      return false;
    }  
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

}
