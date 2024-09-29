import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { BrandComponent } from './pages/brand/brand.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './core/services/auth.guard';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrdersComponent } from './pages/orders/orders.component';

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
  { path: 'checkout/:cartId', component: CheckoutComponent },
  { path: 'allorders', component: OrdersComponent },
  {
    path: 'cart',
    loadChildren: () => import('./core/shared/cart.module').then((m) => m.CartModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  // to make # in the url when the app is on real server /#/cart
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
