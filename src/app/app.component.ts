import {Component} from '@angular/core';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';
import {User} from './models/user';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-rest';
  currentUser: User;
  isAdmin = false;

  constructor(private userService: UserService, private router: Router, public translate: TranslateService) {
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
    });

    translate.setDefaultLang('en');
    translate.use('en');

  }

  logOut() {
    this.userService.logOut().subscribe(data => {
      this.router.navigate(['login']);
    });
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}
