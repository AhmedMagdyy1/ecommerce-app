import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  

  // becz we dont have here a consturctor it's a function 

  let _router = inject(Router)

  if (localStorage.getItem('userToken')){
    return true;
  }else {
    _router.navigate(['/signup'])
    return false
  }
};
