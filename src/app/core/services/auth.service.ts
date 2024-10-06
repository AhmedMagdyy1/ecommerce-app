import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {
    // to fix refresh issue that make the comp when initate the inital value of userData = null
    if (localStorage.getItem('userToken')){

      this.getUserData()
    }
   }


  // when work with variables work with behaviorSubject
  // inital value null and (next(x) will take the next value x )
  userData:BehaviorSubject<any> = new BehaviorSubject('')




  getUserData(){
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'))
    let encoded =  jwtDecode(encodedToken)
    this.userData.next( encoded) 
   }


  // when work with methods work with Observable

  userRegister(data:any):Observable<any>{
   return  this.http.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)
  }
  userLogin(data:any):Observable<any>{
   return  this.http.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data)
  }

  forgotPasswordMethod(email: string): Observable<any> {
    return this.http.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      email
    );
  }
  verifyResetCodeMethod(code: string): Observable<any> {
    return this.http.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      code
    );
  }
  resetPasswordMethod(newPassword: string): Observable<any> {
    return this.http.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      newPassword
    );
  }


  removeToken() {
    localStorage.removeItem('userToken')
    this.userData.next(null)
  }
}
