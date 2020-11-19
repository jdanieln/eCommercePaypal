import { Component, OnInit } from '@angular/core';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eCommercePaypal';
  public items;

  constructor(
    private cartService: CartService
  ){}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

}
