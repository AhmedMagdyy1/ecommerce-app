import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { CartService } from 'src/app/core/shared/cart.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  wishListArray: string[] = [];

  @Input() product:Product = {} as Product
  // @Input() product:Product | undefined

  constructor(private _cart:CartService,private _WishlistService:WishListService) {

  }


  addToCart(id:string){
    this._cart.addProductToCart(id).subscribe((res)=>{
      console.log(res);
      this._cart.numberOfItems.next(res.numOfCartItems)
    })
  }

  updateWishListArray(product: Product | null = null) {
    this._WishlistService.getUserWishList().subscribe({
      next: (response) => {
        this.wishListArray = [];
        for (const i of response.data) {
          this.wishListArray.push(i.id);
        }
        if (product) {
          product.isWishLoading = false;
        }
      },
      error: (err) => {},
    });
  }


  handleWishList(product: Product, productId: string, check: boolean) {
    if (check) {
      this.deleteFromWishList(product, productId);
    } else {
      this.addToWishList(product, productId);
    }
  }

  deleteFromWishList(product: Product, productId: string) {
    product.isWishLoading = true;
    this._WishlistService.removeFromWishList(productId).subscribe({
      next: (response) => {
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
          html: `<div>${product.title
            .split(' ')
            .splice(0, 2)
            .join(
              ' '
            )} removed from your wishlist</div> <i class="fa-solid text-danger fa-heart-crack"></i>`,
        });
        this.updateWishListArray(product);
        this._WishlistService.checkWishListItems();
      },
      error: (err) => {
        product.isWishLoading = false;
      },
    });
  }

  addToWishList(product: Product, productId: string) {
    product.isWishLoading = true;
    this._WishlistService.addToWishList(productId).subscribe({
      next: (response) => {
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
          html: `<div>${product.title
            .split(' ')
            .splice(0, 2)
            .join(
              ' '
            )} added to your wishlist</div> <i class="fa-solid text-danger fa-heart"></i>`,
        });
        this.updateWishListArray(product);
        this._WishlistService.checkWishListItems();
      },
      error: (err) => {
        product.isWishLoading = false;
      },
    });
  }
}
