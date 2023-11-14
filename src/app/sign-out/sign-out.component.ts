import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent {

  isLoading:boolean = false
  handleError:string = ''

  constructor(private _authService:AuthService,private _router:Router){}

  registerForm:  FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)]),
    rePassword: new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)]),
    phone: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(13)]),
  })



  userRegister(form:FormGroup){
    console.log(form);
    if(form.valid){
      this.isLoading = true
      this._authService.userRegister(form.value).subscribe((res:any)=>{
        console.log(res);
      this.isLoading = false
      this._router.navigate(['/login'])
      }
      )
    }
  }
  

  
}
