import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { CartGuardGuard } from 'src/shared/guards/cart-guard.guard';


export const routes: Routes = [
  {
    path: '' , pathMatch : 'full' , redirectTo : '/shop'
  },
  {
    path: 'shop', component: ShopComponent
  },
  {
    path: 'cart', component: CartComponent, canActivate: [CartGuardGuard]
  },
  {
    path: '**', redirectTo: '/shop'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
