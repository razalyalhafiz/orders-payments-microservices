import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { OrdersComponent } from '../components/orders/orders.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { ROUTE_BASE, ROUTE_LOGIN, ROUTE_ORDERS } from '../consts/consts';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([ROUTE_LOGIN]);

const routes: Routes = [
  {
    path: ROUTE_BASE,
    redirectTo: ROUTE_ORDERS,
    pathMatch: 'full',
  },
  {
    path: ROUTE_LOGIN,
    component: LoginComponent,
  },
  {
    path: ROUTE_ORDERS,
    component: OrdersComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
