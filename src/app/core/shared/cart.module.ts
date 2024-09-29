import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from '../../pages/cart/cart.component';
import { FilteredProductsPipe } from '../pipes/filtered-products.pipe';


@NgModule({
  declarations: [
    CartComponent,
    FilteredProductsPipe
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
