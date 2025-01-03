import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/core/interfaces/cart';
import { Product, ProductsArray } from 'src/app/core/interfaces/product';
import { ProductsService } from 'src/app/core/services/products.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { CartService } from 'src/app/core/shared/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  productsList: Product[] = [];
  currentPage: number = 1;
  numberOfPages: number = 0;
  pages: number[] = [];
  wishListArray: string[] = [];
  categoryName: string = '';
  brandName: string = '';
  priceFilterValue: string = 'Lowest To Highest';

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishlistService: WishListService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this._ProductsService.categoryName.subscribe((value) => {
      this.categoryName = value;
    });
    this._ProductsService.brandName.subscribe((value) => {
      this.brandName = value;
    });
    if (this._ProductsService.sort === '+price') {
      this.priceFilterValue = 'Lowest To Highest';
    } else {
      this.priceFilterValue = 'Highest To Lowest';
    }
  }

  getAllProducts() {
    this.pages = [];

    this.updateWishListArray();
    this._ProductsService.getAllProducts().subscribe({
      next: (response: ProductsArray) => {
        this.productsList = response.data;
        this.numberOfPages = response.metadata.numberOfPages;
        this.currentPage = response.metadata.currentPage;
        this.paginationMethod(this.numberOfPages);
      },
      error: (err) => {},
    });
  }

  resetFilters() {
    this._ProductsService.category = '';
    this._ProductsService.brand = '';
    this._ProductsService.categoryName.next(null);
    this._ProductsService.brandName.next(null);
    this.getAllProducts();
  }

  paginationMethod(pages: number) {
    for (let i = 1; i <= pages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    this._ProductsService.page = page;
    this._ProductsService.getAllProducts().subscribe({
      next: (response: ProductsArray) => {
        this.productsList = response.data;
        this.currentPage = response.metadata.currentPage;
      },
    });
  }

  goToPreviousPage() {
    this._ProductsService.page = --this._ProductsService.page;

    this._ProductsService.getAllProducts().subscribe({
      next: (response: ProductsArray) => {
        this.productsList = response.data;
        this.currentPage = response.metadata.currentPage;
      },
      error: (err) => {},
    });
  }

  goToNextPage() {
    this._ProductsService.page = ++this._ProductsService.page;

    this._ProductsService.getAllProducts().subscribe({
      next: (response: ProductsArray) => {
        this.productsList = response.data;
        this.currentPage = response.metadata.currentPage;
      },
      error: (err) => {},
    });
  }

  openProductDetails(productId: string) {
    this._Router.navigate(['/productDetails', productId]);
  }

  filterPrice(price: string) {
    this._ProductsService.sort = price;
    this.getAllProducts();
    if (price === '+price') {
      this.priceFilterValue = 'Lowest To Highest';
    } else {
      this.priceFilterValue = 'Highest To Lowest';
    }
  }

  addToCart(product: Product, productId: string) {
    product.isCartLoading = true;
    this._CartService.addProductToCart(productId).subscribe({
      next: (response: Cart) => {
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
          title: `${product.title
            .split(' ')
            .splice(0, 2)
            .join(' ')} added to your cart`,
        });
        product.isCartLoading = false;
      },
      error: (err) => {
        product.isCartLoading = false;
      },
    });
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
