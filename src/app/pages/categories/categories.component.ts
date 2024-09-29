import { OwlOptions } from 'ngx-owl-carousel-o/public_api';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Category } from '../../core/interfaces/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  allCategories:Category[] = []

  constructor(private _productService:ProductsService){

  }

  ngOnInit(): void {
    this.getAllCategories()
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin:20,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 7
      }
    },
    nav: true
  }

  getAllCategories(){
    this._productService.getCategories().subscribe((res:any)=>{
      console.log(res);
      this.allCategories = res.data
    })
  }
}
