import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Order} from '../../../models/order';
import {User} from '../../../models/user';
import {OrderService} from '../../../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  orderList: Array<Order>;
  foundOrder: Order = new Order();
  public id: number = Number();
  currentUser: User;

  constructor(private adminService: AdminService, private orderService: OrderService,
              private route: ActivatedRoute, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.findAllPaidOrders();
    this.foundOrder = new Order();
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.id !== undefined) {
        this.searchOrderById(params.id);
      }
    });
  }

  searchOrderById(id: number) {
    this.orderService.findOrderById(id).subscribe(data => {
      this.orderList = data as [];
    });
  }

  searchOrder() {
    this.orderService.findOrderById(this.id).subscribe(data => {
      this.orderList = data as [];
    });
  }

  findAllPaidOrders() {
    this.id = null;
    this.adminService.findAllPaidOrders().subscribe(data => {
      this.orderList = data;
    });
  }

  findAllShippedOrders() {
    this.id = null;
    this.adminService.findAllShippedOrders().subscribe(data => {
      this.orderList = data;
    });
  }

  findAllDeliveredOrders() {
    this.id = null;
    this.adminService.findAllDeliveredOrders().subscribe(data => {
      this.orderList = data;
    });
  }

  shipOrder(id: number) {
    this.adminService.shipOrder(id).subscribe(() => {
      this.findAllPaidOrders();
    });
  }

  deliverOrder(id: number) {
    this.adminService.deliverOrder(id).subscribe(() => {
      this.findAllShippedOrders();
    });
  }

  receiveOrder(id: number) {
    this.adminService.receiveOrder(id).subscribe(() => {
      this.findAllDeliveredOrders();
    });
  }

  userList() {
    this.router.navigate(['userList']);
  }

  showChecks() {

  }

}
