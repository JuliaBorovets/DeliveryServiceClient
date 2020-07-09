import {Component, OnInit} from '@angular/core';
import {Receipt} from '../../../models/receipt';
import {User} from '../../../models/user';
import {AdminService} from '../../../services/admin.service';
import {Router} from '@angular/router';
import {ReceiptService} from '../../../services/receipt.service';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.css']
})
export class ReceiptListComponent implements OnInit {

  id: number;
  receiptList: Array<Receipt> = new Array<Receipt>();
  currentUser: User;

  constructor(private adminService: AdminService, private receiptService: ReceiptService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.findAllReceipts();
  }

  findAllReceipts() {
    this.adminService.findAllReceipts().subscribe(data => {
      this.receiptList = data;
    });
  }

  search() {
    this.receiptService.findReceiptById(this.id).subscribe(data => {
      this.receiptList = data;
    }, () => this.findAllReceipts());
  }
}
