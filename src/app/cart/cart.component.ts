import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Cart } from './interface/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cartDetails:Cart = {} as Cart
  constructor(private _cart:CartService){}


  ngOnInit(): void {
    this._cart.getUserCart().subscribe((res)=>{
      console.log(res);
      this.cartDetails = res
    })
  }


  updateCount(count:number,id:string){
    this._cart.updateCount(count,id).subscribe((res)=>{
      this.cartDetails = res
    })
  }

  removeProduct(id:string){
    this._cart.removeProduct(id).subscribe((res)=>{
      this.cartDetails=res
    })
  }
}
