import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Observable} from 'rxjs';

import {HttpClient, HttpHeaders} from '@angular/common/http';


const API_URL = 'http://localhost:8080/api/shipments';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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

  findAllOrders(): Observable<any> {
    return this.http.get(API_URL + '/show/all', {headers: this.headers()});
  }

  findNotPaidOrders(): Observable<any> {
    return this.http.get(API_URL + '/show/not_paid', {headers: this.headers()});
  }

  findDeliveredOrders(): Observable<any> {
    return this.http.get(API_URL + '/show/delivered', {headers: this.headers()});
  }

  findArchivedOrders(): Observable<any> {
    return this.http.get(API_URL + '/show/archived', {headers: this.headers()});
  }

  createOrder(order: Object): Observable<Object> {
    return this.http.post(API_URL, order, {headers: this.headers()});
  }

  findAllTypes(): Observable<any> {
    return this.http.get(API_URL + '/types', {headers: this.headers()});
  }

  findDestinationsFrom(): Observable<any> {
    return this.http.get(API_URL + '/destinations_from', {headers: this.headers()});
  }

  findDestinationsTo(): Observable<any> {
    return this.http.get(API_URL + '/destinations_to', {headers: this.headers()});
  }

  findOrderById(id: number): Observable<any> {
    console.log(id);
    return this.http.get(API_URL + '/find_order/' + id, {headers: this.headers()});
  }

  archiveOrder(id: number): Observable<any> {
    return this.http.patch(API_URL + `/${id}`, {}, {headers: this.headers()});
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(API_URL + `/${id}`, {headers: this.headers()});
  }

}
