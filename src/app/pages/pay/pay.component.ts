import {Component, OnInit} from '@angular/core';
import {BankService} from '../../services/bank.service';
import {Order} from '../../models/order';
import {Receipt} from '../../models/receipt';
import {BankCard} from '../../models/bankCard';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  id: number;
  order: Order = new Order();
  receipt: Receipt = new Receipt();
  cards: Array<BankCard>;
  currentUser: User;
  errorMessage: string;

  constructor(private bankService: BankService, private route: ActivatedRoute, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.findAllCards();
    this.route.queryParams.subscribe(params => {
      this.receipt.orderId = params.id;
      console.log(params.price);
      this.receipt.priceInCents = params.price;
    });
  }

  findAllCards() {
    this.bankService.findAllCards().subscribe(data => {
      this.cards = data;
    });
  }

  pay() {
    this.bankService.pay(this.receipt).subscribe(() => {
      this.router.navigate(['receipt']);
    }, () => {
      this.errorMessage = 'No money';
    });
  }
}
