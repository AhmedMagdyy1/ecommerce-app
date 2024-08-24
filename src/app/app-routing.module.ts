import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { BrandComponent } from './brand/brand.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  { path: 'about', canActivate: [authGuard], component: AboutComponent },
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
  // lazy loading setting module
  // {path:'setting',canActivate:[authGuard],loadChildren:()=>import('../app/setting/setting.module').then((m)=>m.SettingModule)},
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignOutComponent },
  { path: 'checkout/:cartId', component: CheckoutComponent },
  { path: 'allorders', component: OrdersComponent },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  // to make # in the url when the app is on real server /#/cart
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
