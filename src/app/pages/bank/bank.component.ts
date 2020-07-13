import {Component, OnInit} from '@angular/core';
import {BankCard} from '../../models/bankCard';
import {BankService} from '../../services/bank.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  card: BankCard = new BankCard();
  isNew = false;
  isEdit = false;
  cardList: Array<BankCard>;
  errorMessage = '';

  constructor(private bankService: BankService, public translate: TranslateService) {
  }

  ngOnInit(): void {
    this.findAllCards();
  }

  findAllCards() {
    this.bankService.findAllCards().subscribe(data => {
      this.cardList = data;
    });
  }

  newCard(): void {
    this.card = new BankCard();
    this.isNew = true;
    this.isEdit = false;
  }

  save() {
    this.bankService.createCard(this.card).subscribe(() => {
      this.findAllCards();
      this.card = new BankCard();
      this.isNew = false;
    }, error => {
      if (error && error.status === 400) {
        this.errorMessage = this.translate.instant('ERROR_MESSAGES.INCORRECT');
      } else {
        this.errorMessage = this.translate.instant('ERROR_MESSAGES.ALL');
      }
    });
  }

  onEdit(id: number, balance: number) {
    this.card.id = id;
    this.card.balance = balance;
    this.isNew = false;
    this.isEdit = true;
  }

  update() {
    this.bankService.updateCard(this.card).subscribe(() => {
      this.findAllCards();
      this.isEdit = false;
    });
  }

  delete(id: number) {
    this.bankService.deleteCard(id).subscribe(() => {
      this.findAllCards();
    });

  }

  close() {
    this.isNew = false;
    this.isEdit = false;
  }
}
