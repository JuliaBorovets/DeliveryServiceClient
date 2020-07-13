import {Component, OnInit} from '@angular/core';
import {Order} from '../../../models/order';
import {OrderService} from '../../../services/order.service';
import {OrderType} from '../../../models/orderType';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

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

  constructor(private orderService: OrderService, private router: Router, public translate: TranslateService) {
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
      .subscribe(data =>
          this.router.navigate(['/orders']),
        err => {
          this.errorMessage = this.translate.instant('ERROR_MESSAGES.ALL');
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
