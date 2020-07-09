import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const ADMIN_API_URL = 'http://localhost:8080/api/admin';
const API_URL = 'http://localhost:8080/api/user/shipments';
const USER_API_URL = 'http://localhost:8080/api';


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
    return this.http.get(API_URL + '/paid', {headers: this.headers()});
  }

  findAllShippedOrders(): Observable<any> {
    return this.http.get(API_URL + '/shipped', {headers: this.headers()});
  }

  findAllDeliveredOrders(): Observable<any> {
    return this.http.get(API_URL + '/delivered', {headers: this.headers()});
  }

  shipOrder(id: number): Observable<any> {
    return this.http.patch(ADMIN_API_URL + '/to_ship/' + id, {}, {headers: this.headers()});
  }

  deliverOrder(id: number): Observable<any> {
    return this.http.patch(ADMIN_API_URL + '/to_deliver/' + id, {}, {headers: this.headers()});
  }

  receiveOrder(id: number): Observable<any> {
    return this.http.patch(ADMIN_API_URL + '/to_receive/' + id, {}, {headers: this.headers()});
  }

  findAllUsers(): Observable<any> {
    return this.http.get(USER_API_URL + '/users', {headers: this.headers()});
  }

  findUserByLogin(login: string): Observable<any> {
    return this.http.get(USER_API_URL + '/find/' + login, {headers: this.headers()});
  }

  findAllReceipts(): Observable<any> {
    return this.http.get(ADMIN_API_URL + '/show_all_receipts', {headers: this.headers()});
  }

}
