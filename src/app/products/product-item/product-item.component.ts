import { Component, Input } from '@angular/core';
import { Product } from 'src/app/product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product:Product = {} as Product
  // @Input() product:Product | undefined

  constructor(private _cart:CartService){

  }


  addToCart(id:string){
    this._cart.addProductToCart(id).subscribe((res)=>{
      console.log(res);

    })
  }
}
