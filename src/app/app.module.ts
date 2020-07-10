import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/user/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {RegisterComponent} from './pages/user/register/register.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {UnauthorizedComponent} from './pages/user/unauthorized/unauthorized.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrdersComponent} from './pages/orders/order-list/orders.component';
import {NewOrderComponent} from './pages/orders/new-order/new-order.component';
import {BankComponent} from './pages/bank/bank.component';
import {ReceiptComponent} from './pages/receipt/receipt.component';
import {PayComponent} from './pages/pay/pay.component';
import {AdminComponent} from './pages/admin/admin-orders/admin.component';
import {UserListComponent} from './pages/admin/user-list/user-list.component';
import {ReceiptListComponent} from './pages/admin/receipt-list/receipt-list.component';
import {StatisticsComponent} from './pages/admin/statistics/statistics.component';
import {InfoComponent} from './pages/user/info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    OrdersComponent,
    NewOrderComponent,
    BankComponent,
    ReceiptComponent,
    PayComponent,
    AdminComponent,
    UserListComponent,
    ReceiptListComponent,
    StatisticsComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
