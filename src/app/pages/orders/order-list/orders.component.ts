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
  public id: number;
  currentUser: User;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });

    if (this.id !== undefined && this.id !== null) {
      this.searchOrderById(this.id);
    } else {
      this.findAllOrders();
      this.foundOrder = new Order();
    }
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.id !== undefined) {
        this.searchOrderById(params.id);
      } else {
        this.foundOrder = new Order();
      }
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
    if (this.id != null) {
      this.orderService.findOrderById(this.id).subscribe(data => {
        this.orderList = data as [];
      });
    } else {
      this.findAllOrders();
    }
  }

  searchOrderById(id: number) {
    this.orderService.findOrderById(id).subscribe(data => {
      this.orderList = data as [];
    });
  }

  archiveOrder(order: Order) {
    if (confirm('are you sure?')) {
      this.orderService.archiveOrder(order.id).subscribe(() => {
        order.status = Status.ARCHIVED;
        this.findAllOrders();
      });
    }
  }

  deleteOrder(order: Order) {
    if (confirm('are you sure?')) {
      this.orderService.deleteOrder(order.id).subscribe(() => {
        this.findAllOrders();
      });
    }
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
