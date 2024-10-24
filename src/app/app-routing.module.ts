import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { BrandComponent } from './pages/brand/brand.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NotfoundComponent } from './pages/not-found/notfound.component';
import { authGuard } from './core/services/auth.guard';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  { path: 'brands', canActivate: [authGuard], component: BrandComponent },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent },
  {
    path: 'categories',
    canActivate: [authGuard],
    component: CategoriesComponent,
  },
  {
    path: 'productDetails/:id',
    canActivate: [authGuard],
    component: ProductDetailsComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'checkout', canActivate: [authGuard], component: CheckoutComponent },
  { path: 'allorders', component: OrdersComponent },
  { path: 'wishlist', component: WishlistComponent },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./core/shared/cart.module').then((m) => m.CartModule),
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  // to make # in the url when the app is on real server /#/cart
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  // import { NotfoundComponent } from './pages/not-found/notfound.component';
  exports: [RouterModule],
})
export class AppRoutingModule {}
