import {Component, OnInit} from '@angular/core';
import {BankCard} from '../../models/bankCard';
import {BankService} from '../../services/bank.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  card: BankCard = new BankCard();
  submitted = false;

  constructor(private bankService: BankService, private router: Router) {
  }

  ngOnInit(): void {
  }

  newCard(): void {
    this.submitted = false;
  }

  save() {
    this.bankService.createCard(this.card).subscribe(data => {
      this.router.navigate(['/orders']);
    });
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
