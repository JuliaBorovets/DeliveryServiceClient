import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BankCard} from '../models/bankCard';
import {Receipt} from '../models/receipt';

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

  createCard(card: any): Observable<any> {
    return this.http.post('/api/user/bank', card, {headers: this.headers()});
  }

  findAllCards(): Observable<any> {
    return this.http.get('/api/user/bank', {headers: this.headers()});
  }

  updateCard(card: BankCard): Observable<any> {
    return this.http.patch('/api/user/bank', card, {headers: this.headers()});
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete('/api/user/bank/' + id, {headers: this.headers()});
  }

  pay(receipt: Receipt) {
    return this.http.post('/api/user/bank/pay', receipt, {headers: this.headers()});
  }

}
