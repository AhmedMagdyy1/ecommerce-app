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

const routes: Routes = [
  {path:'',redirectTo:"home",pathMatch:'full'},
  {path:'home',canActivate:[authGuard],component:HomeComponent},
  {path:'about',canActivate:[authGuard],component:AboutComponent},
  {path:'cart',canActivate:[authGuard],component:CartComponent},
  {path:'brands',canActivate:[authGuard],component:BrandComponent},
  {path:'products',canActivate:[authGuard],component:ProductsComponent},
  {path:'categories',canActivate:[authGuard],component:CategoriesComponent},
  {path:'login',component:SignInComponent},
  {path:'signup',component:SignOutComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
