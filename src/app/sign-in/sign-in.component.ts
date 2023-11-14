import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  isLoading:boolean = false
  handleError:string = ''

  constructor(private _authService:AuthService,private _router:Router){}

  loginForm:  FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)]),
  })



  userLogin(form:FormGroup){
    console.log(form);
    if(form.valid){
      this.isLoading = true
      this._authService.userLogin(form.value).subscribe((res:any)=>{
        console.log(res);
      this.isLoading = false
      localStorage.setItem('userToken',res.token)
      this._authService.getUserData()
      this._router.navigate(['/home'])
      }
      )
    }
  }
}
