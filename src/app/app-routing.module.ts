import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { DriverComponent } from "./driver/driver.component";
import { ManagerComponent } from "./manager/manager.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import {OrderAddComponent} from "./order-add/order-add.component";
import {ClientComponent} from "./client/client.component";
import {AddressComponent} from "./address/address.component";
import {BoxComponent} from "./box/box.component";
import {HeaderComponent} from "./header/header.component";
import {SingSingupFormaComponent} from "./sing-singup-forma/sing-singup-forma.component";
import {AuthGuard} from "./guards/auth.guard";
import {HomeComponent} from "./home/home.component";

import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'manager', component: ManagerComponent},
  {path: 'driver', component: DriverComponent},
  {path: 'orderDetail/:id', component: OrderDetailComponent},
  {path: 'client', component: ClientComponent},
  {path: 'address', component: AddressComponent},
  {path: 'box', component: BoxComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component:SingSingupFormaComponent},
  {path: 'manager', component: ManagerComponent, canActivate: [AuthGuard]},
  {path: 'driver', component: DriverComponent, canActivate: [AuthGuard]},
  {path: 'orderDetail/:id', component: OrderDetailComponent,canActivate: [AuthGuard]},
  {path: 'order', component: OrderAddComponent, canActivate: [AuthGuard]},
  {path: 'client', component: ClientComponent, canActivate: [AuthGuard]},
  {path: 'address', component: AddressComponent, canActivate: [AuthGuard]},
  {path: 'box', component: BoxComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
