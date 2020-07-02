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
import {OrdersComponent} from './pages/orders/ordersList/orders.component';
import {NewOrderComponent} from './pages/orders/new-order/new-order.component';
import {BankComponent} from './pages/bank/bank.component';

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
    BankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
