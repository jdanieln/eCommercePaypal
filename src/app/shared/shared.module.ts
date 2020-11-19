import { NgModule } from '@angular/core';

import { NgxPayPalModule } from 'ngx-paypal';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    NgxPayPalModule,
    NgbModule
  ],
  exports: [
    NgxPayPalModule,
    NgbModule
  ]
})
export class SharedModule { }
