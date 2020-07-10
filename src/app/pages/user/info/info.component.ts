import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  user: User;
  isEdit = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  edit() {
    this.isEdit = true;
  }

  close() {
    this.isEdit = false;
  }

  onSubmit() {
    this.userService.updateUserInfo(this.user).subscribe(() => {
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.isEdit = false;
      }
    );
  }

}
