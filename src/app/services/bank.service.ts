import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  public currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  headers() {
    return new HttpHeaders({
      authorization: 'Basic ' + btoa(this.currentUser.login + ':' + this.currentUser.password),
      'Content-Type': 'application/json; charset=UTF-8'
    });
  }

  createCard(card: Object): Observable<Object> {
    return this.http.post(API_URL, card, {headers: this.headers()});
  }
}
