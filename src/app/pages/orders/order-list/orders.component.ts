import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Order} from '../../../models/order';
import {User} from '../../../models/user';
import {OrderService} from '../../../services/order.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Status} from '../../../models/status';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  orderList: Array<Order>;
  foundOrder: Order = new Order();
  public id: number = Number();
  currentUser: User;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.findAllOrders();
    this.foundOrder = new Order();
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchOrderById(params.id);
    });
  }

  findAllOrders() {
    this.id = null;
    this.orderService.findAllOrders().subscribe(data => {
      this.orderList = data;
    });
  }

  findNotPaidOrders() {
    this.id = null;
    this.orderService.findNotPaidOrders().subscribe(data => {
      this.orderList = data;
    });
  }

  findDeliveredOrders() {
    this.id = null;
    this.orderService.findDeliveredOrders().subscribe(data => {
      this.orderList = data;
    });
  }

  findArchivedOrders() {
    this.id = null;
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

  searchOrderById(id: number) {
    this.orderService.findOrderById(id).subscribe(data => {
      this.orderList = data as [];
    });
  }

  archiveOrder(order: Order) {
    this.orderService.archiveOrder(order.id).subscribe(() => {
      order.status = Status.ARCHIVED;
      this.findAllOrders();
    });
  }

  deleteOrder(order: Order) {
    this.orderService.deleteOrder(order.id).subscribe(() => {
      this.findAllOrders();
    });
  }

  showReceipt(id: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'id': id
      }
    };
    this.router.navigate(['receipt'], navigationExtras);

  }

  pay(id: number, order: Order) {
    console.log(order.shippingPriceInCents);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'id': id,
        'price': order.shippingPriceInCents
      }
    };
    this.router.navigate(['payOrder'], navigationExtras);
  }
}
