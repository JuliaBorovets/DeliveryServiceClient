import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

const API_URL = 'http://localhost:8080/api/user/receipt';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

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

  showAllUserReceipts(): Observable<any> {
    return this.http.get(API_URL, {headers: this.headers()});
  }

  findReceiptById(id: number): Observable<any> {
    return this.http.get(API_URL + '/' + id, {headers: this.headers()});
  }

}
