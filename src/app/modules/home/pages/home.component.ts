import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../../core/services/config.service';
import { CartService } from './../../../core/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products;
  constructor(
    private configService: ConfigService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.configService.getConfig('product').subscribe((item: any) => {
      console.log(item);
      this.products = item.products;
    });
  }
  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}
