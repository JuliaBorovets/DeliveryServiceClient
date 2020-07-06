import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Receipt} from '../../models/receipt';
import {ReceiptService} from '../../services/receipt.service';
import {User} from '../../models/user';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit, AfterViewInit {

  receiptList: Array<Receipt>;
  currentUser: User;
  id: number;

  constructor(private receiptService: ReceiptService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.showAllUserReceipts();
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.id !== undefined) {
        this.searchReceiptById(params.id);
      }
    });
  }

  showAllUserReceipts() {
    this.receiptService.showAllUserReceipts().subscribe(data => {
      this.receiptList = data;
    });
  }

  searchReceiptById(id: number) {
    this.receiptService.findReceiptById(id).subscribe(data => {
      this.receiptList = data as [];
    });
  }

  searchReceipt() {
    this.receiptService.findReceiptById(this.id).subscribe(data => {
      this.receiptList = data as [];
    }, () => {
      this.showAllUserReceipts();
    });
  }

  showOrder(id: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'id': id
      }
    };
    this.router.navigate(['orders'], navigationExtras);

  }


}
