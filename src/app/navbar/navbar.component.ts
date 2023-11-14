import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn : boolean = false


  // will case error becz the navbar on initial will make the userdata value and not make it change 
  // so we need behaviorSubject
    constructor(private _authService:AuthService){
      this._authService.userData.subscribe((res)=>{
        if(this._authService.userData.getValue()){
          this.isLoggedIn = true
        }else {
          this.isLoggedIn = false
        }
        
      })
    //   if (this._authService.userData != null){
    //      this.isLoggedIn = true
    //   }else {
    //     this.isLoggedIn = false
    //   }
    // }
    }
  

    logOut(){
      this._authService.removeToken()
    }
}
