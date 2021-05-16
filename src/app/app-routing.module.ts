import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { DriverComponent } from "./driver/driver.component";
import { ManagerComponent } from "./manager/manager.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import {OrderAddComponent} from "./order-add/order-add.component";
import {ClientComponent} from "./client/client.component";
import {AddressComponent} from "./address/address.component";
import {BoxComponent} from "./box/box.component";
import {SingSingupFormaComponent} from "./sing-singup-forma/sing-singup-forma.component";
import {AuthGuard} from "./guards/auth.guard";
import {HomeComponent} from "./home/home.component";


import {ProfileComponent} from "./profile/profile.component";
import {MapsComponent} from "./maps/maps.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component:SingSingupFormaComponent},
  {path: 'profile', component: ProfileComponent,canActivate: [AuthGuard]},
  {path: 'manager', component: ManagerComponent, canActivate: [AuthGuard]},
  {path: 'driver', component: DriverComponent, canActivate: [AuthGuard]},
  {path: 'orderDetail/:id', component: OrderDetailComponent,canActivate: [AuthGuard]},
  {path: 'order', component: OrderAddComponent, canActivate: [AuthGuard]},
  {path: 'client', component: ClientComponent, canActivate: [AuthGuard]},
  {path: 'address', component: AddressComponent, canActivate: [AuthGuard]},
  {path: 'box', component: BoxComponent, canActivate: [AuthGuard]},
  {path: 'maps', component: MapsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
