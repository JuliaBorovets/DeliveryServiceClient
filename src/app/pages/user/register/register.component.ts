import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  errorMessage = '';

  constructor(private userService: UserService, private router: Router, public translate: TranslateService) {
  }

  ngOnInit(): void {
    if (this.userService.currentUserValue) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  register() {
    this.userService.register(this.user).subscribe(data => {
      this.router.navigate(['/profile']);
    }, err => {
      if (err && err.status === 409) {
        this.errorMessage = this.translate.instant('ERROR_MESSAGES.USER_ALREADY_EXISTS');
      } else if (err && err.status === 400) {
        this.errorMessage = this.translate.instant('ERROR_MESSAGES.PASSWORD');
      } else {
        this.errorMessage = this.translate.instant('ERROR_MESSAGES.ALL');
      }
    });
  }

}
