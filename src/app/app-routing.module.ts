import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './pages/user/login/login.component';
import {RegisterComponent} from './pages/user/register/register.component';
// import {ProfileComponent} from './pages/profile/profile.component';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {UnauthorizedComponent} from './pages/user/unauthorized/unauthorized.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './models/role';
import {OrdersComponent} from './pages/orders/order-list/orders.component';
import {NewOrderComponent} from './pages/orders/new-order/new-order.component';
import {BankComponent} from './pages/bank/bank.component';
import {ReceiptComponent} from './pages/receipt/receipt.component';
import {PayComponent} from './pages/pay/pay.component';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ADMIN, Role.USER]
    }
  },

  {
    path: 'cards',
    component: BankComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ADMIN, Role.USER]
    }
  },

  {
    path: 'newOrder',
    component: NewOrderComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ADMIN, Role.USER]
    }
  },

  {
    path: 'receipt',
    component: ReceiptComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ADMIN, Role.USER]
    }
  },
  {
    path: 'payOrder',
    component: PayComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ADMIN, Role.USER]
    }
  },

  {
    path: 'home',
    component: HomeComponent
  },

  // error pages
  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnauthorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    // not-pre-defined paths.
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }
}
