import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../../models/user';
import {AdminService} from '../../../services/admin.service';
import {Role} from '../../../models/role';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  currentUser: User;
  foundUser: User = new User();
  userList: Array<User>;
  id: number;
  login = '';

  constructor(private adminService: AdminService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.findAllUsers();
  }

  findAllUsers() {
    this.adminService.findAllUsers().subscribe(data => {
      this.userList = data;
    });
  }

  changeRole(id: number, role: string) {
    const newRole = role === Role.ADMIN ? Role.USER : Role.ADMIN;
    console.log(newRole);
    this.adminService.changeRole(id, newRole).subscribe(data => {
      this.findAllUsers();
    });
  }

  searchUser() {
    console.log(this.login);
    if (this.login === '') {
      console.log('all');
      this.adminService.findAllUsers().subscribe(data => {
        this.userList = data as [];
      });
    } else {
      console.log('not all');
      this.adminService.findUserByLogin(this.login).subscribe(data => {
        this.userList = data as [];
      });
    }
  }
}
