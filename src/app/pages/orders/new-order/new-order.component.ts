import {Component, OnInit} from '@angular/core';
import {Order} from '../../../models/order';
import {OrderService} from '../../../services/order.service';
import {OrderType} from '../../../models/orderType';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  order: Order = new Order();
  destinationsFrom: Array<String>;
  destinationsTo: Array<String>;
  types: Array<OrderType>;
  submitted = false;
  errorMessage: string;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.findAllTypes();
    this.findDestinationsFrom();
    this.findDestinationsTo();
  }

  newOrder(): void {
    this.submitted = false;
  }

  save() {
    this.orderService.createOrder(this.order)
      .subscribe(data => console.log(data), err => {
          this.errorMessage = 'Unexpected error occurred. Error is: ' + err;
      });
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  findAllTypes() {
    this.orderService.findAllTypes().subscribe(data => {
      this.types = data;
    });
  }

  findDestinationsFrom() {
    this.orderService.findDestinationsFrom().subscribe(data => {
      this.destinationsFrom = data;
    });
  }

  findDestinationsTo() {
    this.orderService.findDestinationsTo().subscribe(data => {
      this.destinationsTo = data;
    });
  }
}
