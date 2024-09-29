import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {


  allProducts:Product[]=[]
  searchKey:string = ''
  constructor(private _productService:ProductsService){

  }

  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    this._productService.getProducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.allProducts = res.data
      }
    })
  }
}
