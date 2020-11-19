import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';
import { PaypalCheckoutComponent } from './components/paypal-checkout/paypal-checkout.component';
import { SharedModule } from './../../shared/shared.module';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [HomeComponent, PaypalCheckoutComponent, CartComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
