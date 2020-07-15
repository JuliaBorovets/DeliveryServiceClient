import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

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
    return this.http.get('/api/user/receipt', {headers: this.headers()});
  }

  findReceiptById(id: number): Observable<any> {
    return this.http.get('api/user/receipt/' + id, {headers: this.headers()});
  }

}
