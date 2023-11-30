import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http:HttpClient) {

  }

  addProductToCart(id:string):Observable<any>{
    return this._http.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:id},{
      headers:{
        token:`${localStorage.getItem('userToken')}`
      }
    })
  }
  getUserCart():Observable<any>{
    return this._http.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token:`${localStorage.getItem('userToken')}`
      }
    })
  }
  updateCount(count:number,id:string):Observable<any>{
    return this._http.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      count:`${count}`
    },{
      headers:{
        token:`${localStorage.getItem('userToken')}`
      }
    })
  }
  removeProduct(id:string):Observable<any>{
    return this._http.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      headers:{
        token:`${localStorage.getItem('userToken')}`
      }
    })
  }
}
