import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoading: boolean = false;
  handleError: string = '';
  hidePassword: boolean = true; // New variable to toggle password visibility

  constructor(private _authService: AuthService, private _router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/),
    ]),
  });

  // Toggle password visibility
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  userLogin(form: FormGroup) {
    if (form.valid) {
      this.isLoading = true; 
      this.handleError = '';  

      this._authService.userLogin(form.value)
        .pipe(
          // Handle errors
          catchError((error) => {
            console.error('Login failed:', error);
            this.handleError = 'Failed to login. Please try again later.'; 
            return throwError(error); 
          }),

          finalize(() => {
            this.isLoading = false; 
          })
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            localStorage.setItem('userToken', res.token); 
            this._authService.getUserData();             
            this._router.navigate(['/home']);             
          },
          (error) => {
            console.error('Error during login:', error);
            this.handleError = 'Invalid login credentials.'; 
          }
        );
    }
  }
}
