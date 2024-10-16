import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartDetails } from 'src/app/core/interfaces/cart';
import { Product, ProductDetails } from 'src/app/core/interfaces/product';
import { ProductsService } from 'src/app/core/services/products.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { CartService } from 'src/app/core/shared/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  params: string = '';
  productDetails: Product | null = null;
  displayedImage: string = '';
  isLoading: boolean = false;
  isWishLoading: boolean = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishlistService: WishListService
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((value) => {
      this.params = value['id'];
      this.getSpecificProduct(this.params);
    });
  }

  getSpecificProduct(id: string) {
    this._ProductsService.getSpecificProduct(id).subscribe({
      next: (response: ProductDetails) => {
        this.productDetails = response.data;
        this.displayedImage = this.productDetails.images[0];
      },
    });
  }

  changeDisplayedImage(par: any) {
    this.displayedImage = par.getAttribute('src');
  }

  addToCart(productId: string) {
    this.isLoading = true;
    this._CartService.addProductToCart(productId).subscribe({
      next: (response: CartDetails) => {
        this._CartService.numberOfItems.next(response.numOfCartItems);
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
          title: `Product added to your cart`,
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  addToWishList(name: string, productId: string) {
    this.isWishLoading = true;
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
          html: `<div>${name
            .split(' ')
            .splice(0, 2)
            .join(
              ' '
            )} added to your wishlist</div> <i class="fa-solid text-danger fa-heart"></i>`,
        });
        this._WishlistService.checkWishListItems();
        this.isWishLoading = false;
      },
      error: (err) => {
        this.isWishLoading = false;
      },
    });
  }
}
