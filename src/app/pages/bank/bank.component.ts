import {Component, OnInit} from '@angular/core';
import {BankCard} from '../../models/bankCard';
import {BankService} from '../../services/bank.service';

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

  constructor(private bankService: BankService) {
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
