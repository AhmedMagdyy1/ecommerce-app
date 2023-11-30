import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { FilteredProductsPipe } from './filtered-products.pipe';


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
