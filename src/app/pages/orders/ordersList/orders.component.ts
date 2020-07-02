import {Component, OnInit} from '@angular/core';
import {Order} from '../../../models/order';
import {User} from '../../../models/user';
import {OrderService} from '../../../services/order.service';
import {Router} from '@angular/router';
import {Status} from '../../../models/status';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList: Array<Order>;
  foundOrder: Order;
  id: number;
  currentUser: User;

  constructor(private orderService: OrderService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.findAllOrders();
    this.foundOrder = new Order();
  }

  findAllOrders() {
    this.orderService.findAllOrders().subscribe(data => {
      this.orderList = data;
    });
  }

  findNotPaidOrders() {
    this.orderService.findNotPaidOrders().subscribe(data => {
      this.orderList = data;
    });
  }

  findDeliveredOrders() {
    this.orderService.findDeliveredOrders().subscribe(data => {
      this.orderList = data;
    });
  }

  findArchivedOrders() {
    this.orderService.findArchivedOrders().subscribe(data => {
      this.orderList = data;
    });
  }

  searchOrder() {
    console.log(this.id);
    this.orderService.findOrderById(this.id).subscribe(data => {
      this.orderList = data as [];
    });
  }

  archiveOrder(order: Order) {
    this.orderService.archiveOrder(order.id).subscribe(() => {
      // this.findAllOrders();
      order.status = Status.ARCHIVED;
    });
  }

  deleteOrder(order: Order) {
    this.orderService.deleteOrder(order.id);
  }
}
