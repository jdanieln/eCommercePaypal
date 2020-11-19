import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public items;
  closeResult = '';
  public payPalConfig ? : IPayPalConfig;
  public total: number = 0;
  public itemsForPaypal: any = [];

  constructor(
    private cartService: CartService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();

    this.total = this.items.reduce((sum, current) => sum + current.price, 0);

    this.itemsForPaypal = this.items.map(item => {
     return {
       name: `${ item.description }`,
       quantity: '1',
       category: 'PHYSICAL_GOODS',
       unit_amount: {
          currency_code: 'EUR',
          value: item.price.toFixed(2),
      },
     }
    });
  }

  open(content) {
    this.initConfig();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private initConfig(): void {
    console.log(this.total.toFixed(2), 'total', this.itemsForPaypal);
    this.payPalConfig = {
        currency: 'EUR',
        clientId: environment.paypalClientId,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
              amount: {
                currency_code: 'EUR',
                value: this.total.toFixed(2),
                breakdown: {
                    item_total: {
                        currency_code: 'EUR',
                        value: this.total.toFixed(2)
                    }
                }
            },
            items: this.itemsForPaypal
          }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
                this.cartService.clearCart();
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.cartService.clearCart();
            //this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            //this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            //this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            //this.resetStatus();
        },
    };
  }
}
