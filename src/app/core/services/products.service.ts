import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  limit: number = 40;
  sort: string = '+price';
  minPrice: number = 100;
  page: number = 1;
  maxPrice: number = 50000;
  category: string = '';
  brand: string = '';
  categoryName: BehaviorSubject<any> = new BehaviorSubject(null);
  brandName: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _httpClient:HttpClient) {

}

  getProducts():Observable<any>{
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  getAllProducts(): Observable<any> {
    if (this.category && this.brand) {
      return this._httpClient.get(
        `${this.baseUrl}/api/v1/products?limit=${this.limit}&sort=${this.sort}&price[gte]=${this.minPrice}&page=${this.page}&brand=${this.brand}&price[lte]=${this.maxPrice}&category[in]=${this.category}`
      );
    } else if (this.brand) {
      return this._httpClient.get(
        `${this.baseUrl}/api/v1/products?limit=${this.limit}&sort=${this.sort}&price[gte]=${this.minPrice}&page=${this.page}&brand=${this.brand}&price[lte]=${this.maxPrice}`
      );
    } else if (this.category) {
      return this._httpClient.get(
        `${this.baseUrl}/api/v1/products?limit=${this.limit}&sort=${this.sort}&price[gte]=${this.minPrice}&page=${this.page}&price[lte]=${this.maxPrice}&category[in]=${this.category}`
      );
    } else {
      return this._httpClient.get(
        `${this.baseUrl}/api/v1/products?limit=${this.limit}&sort=${this.sort}&price[gte]=${this.minPrice}&page=${this.page}&price[lte]=${this.maxPrice}`
      );
    }
  }
  getCategories():Observable<any>{
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  getProductById(id:string):Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  getSpecificProduct(id: string): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/api/v1/products/${id}`);
  }
}
