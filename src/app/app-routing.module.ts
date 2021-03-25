import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { DriverComponent } from "./driver/driver.component";
import { ManagerComponent } from "./manager/manager.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
// import {OrderAddComponent} from "./order-add/order-add.component";
import {ClientComponent} from "./client/client.component";
import {AddressComponent} from "./address/address.component";
import {BoxComponent} from "./box/box.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'manager', component: ManagerComponent},
  {path: 'driver', component: DriverComponent},
  {path: 'orderDetail/:id', component: OrderDetailComponent},
  // {path: 'order', component: OrderAddComponent},
  {path: 'client', component: ClientComponent},
  {path: 'address', component: AddressComponent},
  {path: 'box', component: BoxComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
