import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../shared/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartId:string = ''

  constructor(private _cart:CartService,private _route:ActivatedRoute){
    
    
    // another way to get cartId wiz behavior subject from cart

    // this._cart.cartId.subscribe((res)=>{
    //   this.cartId = res
    // })
  }


  ngOnInit(): void {
    this._route.params.subscribe((res:any)=>{
      console.log(res);
      this.cartId = res.cartId
    })
  }
    shippingAddress:FormGroup=new FormGroup({
      details: new FormControl(null),
      phone:new FormControl(null),
      city: new FormControl(null)
    })


    checkoutDetails(form:FormGroup){
      console.log(form.value);
      this._cart.handleOnlinePayment(this.cartId,form.value).subscribe((res)=>{
        if(res.status == 'success'){
          window.location.href = res.session.url
        }
      })
    }
}
