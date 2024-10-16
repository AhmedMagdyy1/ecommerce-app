import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/shared/cart.service';
import { WishListService } from 'src/app/core/services/wish-list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  numberOfItems: number = 0;
  wishListItems: number = 0;


  // will case error becz the navbar on initial will make the userdata value and not make it change
  // so we need behaviorSubject
  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    private _WishlistService:WishListService
  ) {
    this._authService.userData.subscribe((res) => {
      if (this._authService.userData.getValue()) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    this._cartService.numberOfItems.subscribe((res) => {
      this.numberOfItems = res;
    });
    this._WishlistService.checkWishListItems();
    //   if (this._authService.userData != null){
    //      this.isLoggedIn = true
    //   }else {
    //     this.isLoggedIn = false
    //   }
    // }
  }

  ngOnInit(): void {
    this._WishlistService.numberOfWishItems.subscribe((value) => {
      this.wishListItems = value;
    });
  }

  logOut() {
    this._authService.removeToken();
  }
}
