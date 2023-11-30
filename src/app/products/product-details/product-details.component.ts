import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductsService } from 'src/app/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productId:string =''
  productDetails:Product= {} as Product


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items:3
      },
      992:{
        items:5
      }
    },
    nav: true
  }



  constructor(
    private _activatedRoute:ActivatedRoute,
     private _productService:ProductsService,
     private _cart:CartService
     ){
    this._activatedRoute.params.subscribe((res:any)=>{
      console.log(res);
      this.productId = res.id
    })
    this._productService.getProductById(this.productId).subscribe((res:any)=>{
      console.log(res);
      this.productDetails = res.data
    })
  }




  addToCart(id:string){
    this._cart.addProductToCart(id).subscribe((res)=>{
      console.log(res);

    })
  }

}
