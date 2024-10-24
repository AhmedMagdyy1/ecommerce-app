import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  numberOfItems:BehaviorSubject<number> = new BehaviorSubject(0)
  cartId: string = '';

  // cartId:BehaviorSubject<string> = new BehaviorSubject('')
  constructor(private _http:HttpClient) {
    this.getUserCart().subscribe((res)=>{
      this.numberOfItems.next(res.numOfCartItems)
      this.cartId = res.data._id
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

  clearUserCart(): Observable<any> {
    return this._http.delete(`https://ecommerce.routemisr.com/api/v1/cart/`);
  }

  createCashOrder(addressValue: Object): Observable<any> {
    return this._http.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${this.cartId}`,
      { shippingAddress: addressValue }
    );
  }


  // handleOnlinePayment(cartId:string,shippingAddress:any):Observable<any>{
  //   return this._http.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://freshcart-five-psi.vercel.app/#/home`,{
  //     shippingAddress:shippingAddress
  //   })
  // }

  onlineGatewayPayment(addressValue: Object): Observable<any> {
    return this._http.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${this.cartId}?url=https://freshcart-five-psi.vercel.app/#/home`,
      { shippingAddress: addressValue }
    );
  }
}
