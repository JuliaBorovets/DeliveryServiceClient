import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Role} from '../../models/role';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  isAdmin = false;
  currentUser: User;

  constructor(private userService: UserService) {
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.currentUser.role !== null) {
      this.isAdmin = this.currentUser.role === Role.ADMIN;
      console.log(this.isAdmin);
    }
  }

}
