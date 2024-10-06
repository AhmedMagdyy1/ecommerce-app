import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Category, list } from '../../core/interfaces/category';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoriesList: list[] = [];

  constructor(
    private _CategoriesService: CategoriesService,
    private _Router: Router,
    private _ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._CategoriesService.getAllCategories().subscribe({
      next: (response: Category) => {
        this.categoriesList = response.data;
      },
      error: (err) => {},
    });
  }

  goToCategory(categoryName: string, categoryId: string) {
    this._ProductsService.page = 1;
    this._ProductsService.category = categoryId;
    this._ProductsService.categoryName.next(categoryName);
    this._Router.navigate(['/products']);
  }
}
