import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/shared/cart.service';
import { CartDetails, Products } from '../../core/interfaces/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartDetails: CartDetails | null = null;
  cartProductsArray: Products[] | null = null;

  constructor(private _CartService: CartService) {}

  ngOnInit(): void {
    this.getAllCartProducts();
  }

  getAllCartProducts() {
    this._CartService.getUserCart().subscribe({
      next: (response: CartDetails) => {
        this._CartService.cartId = response.data._id
        this.cartDetails = response;
        this.cartProductsArray = response.data.products;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteProduct(productId: string) {
    this._CartService.removeProduct(productId).subscribe({
      next: (response: CartDetails) => {
        this._CartService.numberOfItems.next(response.numOfCartItems);
        if (response.numOfCartItems === 0) {
          this.deleteAllCart();
        } else {
          this.cartDetails = response;
          this.cartProductsArray = response.data.products;
        }
      },
      error: (err) => {},
    });
  }

  updateProductQuantity(productId: string, count: number) {
    this._CartService.updateCount(count, productId).subscribe({
      next: (response: CartDetails) => {
        this._CartService.numberOfItems.next(response.numOfCartItems);
        this.cartDetails = response;
        this.cartProductsArray = response.data.products;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  increaseProductQuantity(productId: string, count: number) {
    this.updateProductQuantity(productId, ++count);
  }

  decreaseProductQuantity(productId: string, count: number) {
    if (--count === 0) {
      this.deleteProduct(productId);
    } else {
      this.updateProductQuantity(productId, --count);
    }
  }

  deleteAllCart() {
    this._CartService.clearUserCart().subscribe({
      next: () => {
        this._CartService.numberOfItems.next(0);
        this.cartDetails = null;
      },
    });
  }
  
}
