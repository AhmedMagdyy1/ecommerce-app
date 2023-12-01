import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  numberOfItems:BehaviorSubject<number> = new BehaviorSubject(0)
  cartId:BehaviorSubject<string> = new BehaviorSubject('')
  constructor(private _http:HttpClient) {
    this.getUserCart().subscribe((res)=>{
      this.numberOfItems.next(res.numOfCartItems)
      this.cartId.next(res.data._id)
    })
  }

  addProductToCart(id:string):Observable<any>{
    return this._http.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:id})
  }
  getUserCart():Observable<any>{
    return this._http.get('https://ecommerce.routemisr.com/api/v1/cart')
  }
  updateCount(count:number,id:string):Observable<any>{
    return this._http.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      count:`${count}`
    })
  }
  removeProduct(id:string):Observable<any>{
    return this._http.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }
  handleOnlinePayment(cartId:string,shippingAddress:any):Observable<any>{
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{
      shippingAddress:shippingAddress
    })
  }
}
