import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

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

  findAllPaidOrders(): Observable<any> {
    return this.http.get(  '/api/user/shipments/paid', {headers: this.headers()});
  }

  findAllShippedOrders(): Observable<any> {
    return this.http.get(  '/api/user/shipments/shipped', {headers: this.headers()});
  }

  findAllDeliveredOrders(): Observable<any> {
    return this.http.get( '/api/user/shipments/delivered', {headers: this.headers()});
  }

  shipOrder(id: number): Observable<any> {
    return this.http.patch( '/api/admin/to_ship/' + id, {}, {headers: this.headers()});
  }

  deliverOrder(id: number): Observable<any> {
    return this.http.patch( '/api/admin/to_deliver/' + id, {}, {headers: this.headers()});
  }

  receiveOrder(id: number): Observable<any> {
    return this.http.patch( '/api/admin/to_receive/' + id, {}, {headers: this.headers()});
  }

  findAllUsers(): Observable<any> {
    return this.http.get(  '/api/users', {headers: this.headers()});
  }

  findUserByLogin(login: string): Observable<any> {
    return this.http.get( '/api/find/' + login, {headers: this.headers()});
  }

  findAllReceipts(): Observable<any> {
    return this.http.get(  '/api/admin/show_all_receipts', {headers: this.headers()});
  }

  createStatistics(): Observable<any> {
    return this.http.get('/api/admin', {headers: this.headers()});
  }

  numbersYear(): Observable<any> {
    return this.http.get('/api/admin/numbersYear', {headers: this.headers()});
  }

  earningsYear(): Observable<any> {
    return this.http.get('/api/admin/earningsYear', {headers: this.headers()});
  }

  changeRole(id: number, role: string) {
    return this.http.patch(`/api/change/${id}/${role}`, {}, {headers: this.headers()});
  }

}
