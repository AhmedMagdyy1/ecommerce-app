import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  currentStep: number = 0;
  hide: boolean = true;
  isEmailCompleted = false;
  isCodeCompleted = false;
  isPasswordCompleted = false;
  userEmail: string = '';

  constructor(
    private _AuthenticationService: AuthService,
    private _Router: Router
  ) {}
  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });
  newPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=[A-Z])(?=(?:[^0-9]*[0-9]){2}).{6,}$/),
    ]),
  });

  emailCheck(form: FormGroup) {
    if (form.valid) {
      this._AuthenticationService.forgotPasswordMethod(form.value).subscribe({
        next: (response) => {
          this.isEmailCompleted = true;
          this.userEmail = form.get('email')?.value;
          setTimeout(() => {
            this.currentStep++;
          }, 500);
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'success',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `${response.message}`,
          });
        },
        error: (err) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 4000,
            icon: 'error',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `${err.error.message}`,
          });
        },
      });
    }
  }
  codeCheck(form: FormGroup) {
    if (form.valid) {
      this._AuthenticationService.verifyResetCodeMethod(form.value).subscribe({
        next: (response) => {
          this.isCodeCompleted = true;
          setTimeout(() => {
            this.currentStep++;
          }, 500);
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'success',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `${response.status} please enter your new password`,
          });
          let dataEmail = this.emailForm.get('email')?.value;
          if (dataEmail) {
            this.newPasswordForm.controls['email'].setValue(dataEmail);
          }
        },
        error: (err) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 4000,
            icon: 'error',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `${err.error.message}`,
          });
        },
      });
    }
  }
  newPasswordCheck(form: FormGroup) {
    if (form.valid) {
      this._AuthenticationService.resetPasswordMethod(form.value).subscribe({
        next: (response) => {
          this.isPasswordCompleted = true;
          setTimeout(() => {
            this._Router.navigate(['/login']);
          }, 500);
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'success',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `Success please login to your account`,
          });
        },
        error: (err) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 4000,
            icon: 'error',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `${err.error.message}`,
          });
        },
      });
    }
  }
}
