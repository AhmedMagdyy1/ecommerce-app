import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Brands, list } from 'src/app/core/interfaces/brands';
import { BrandsService } from 'src/app/core/services/brands.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent {
  brandList: list[] = [];
  currentPage: number = 1;
  numberOfPages: number = 0;
  pages: number[] = [];

  constructor(
    private _BrandsService: BrandsService,
    private _Router: Router,
    private _ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this._BrandsService.getAllBrands().subscribe({
      next: (response: Brands) => {
        this.brandList = response.data;
        this.numberOfPages = response.metadata.numberOfPages;
        this.currentPage = response.metadata.currentPage;
        this.paginationMethod(this.numberOfPages);
      },
      error: (err) => {},
    });
  }

  paginationMethod(pages: number) {
    for (let i = 1; i <= pages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    this._BrandsService.page = page;
    this._BrandsService.getAllBrands().subscribe({
      next: (response: Brands) => {
        this.brandList = response.data;
        this.currentPage = response.metadata.currentPage;
      },
    });
  }

  goToPreviousPage() {
    this._BrandsService.page = --this._BrandsService.page;

    this._BrandsService.getAllBrands().subscribe({
      next: (response: Brands) => {
        this.brandList = response.data;
        this.currentPage = response.metadata.currentPage;
      },
      error: (err) => {},
    });
  }

  goToNextPage() {
    this._BrandsService.page = ++this._BrandsService.page;

    this._BrandsService.getAllBrands().subscribe({
      next: (response: Brands) => {
        this.brandList = response.data;
        this.currentPage = response.metadata.currentPage;
      },
      error: (err) => {},
    });
  }

  goToCategory(brandName: string, brandId: string) {
    this._ProductsService.page = 1;
    this._ProductsService.brandName.next(brandName);
    this._ProductsService.brand = brandId;
    this._Router.navigate(['/products']);
  }
}
