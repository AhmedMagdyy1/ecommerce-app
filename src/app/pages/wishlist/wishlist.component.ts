import { Component } from '@angular/core';
import { Cart } from 'src/app/core/interfaces/cart';
import { product, WishList } from 'src/app/core/interfaces/wishlist';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { CartService } from 'src/app/core/shared/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  products: product[] = [];

  constructor(
    private _WishlistService: WishListService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    this.getUserWishList();
  }

  getUserWishList() {
    
    this._WishlistService.getUserWishList().subscribe({
      next: (response: WishList) => {
        this.products = response.data;
      },
      error: (err) => {
      },
    });
  }

  deleteProductFromWishList(productId: string) {
    
    this._WishlistService.removeFromWishList(productId).subscribe({
      next: (response: WishList) => {
        this._WishlistService.numberOfWishItems.next(response.data.length);
        this.getUserWishList();
      },
      error: (err) => {
      },
    });
  }

  addProductToCart(productId: string) {
    
    this._CartService.addProductToCart(productId).subscribe({
      next: (response: Cart) => {
        this._CartService.numberOfItems.next(response.numOfCartItems);
        this.deleteProductFromWishList(productId);
      },
      error: (err) => {
      },
    });
  }
}
