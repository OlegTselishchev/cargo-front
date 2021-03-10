import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { HomeComponent } from './home/home.component';
import { DriverComponent } from './driver/driver.component';
import { ManagerComponent } from './manager/manager.component';
import {ClientFilterLastNPipe} from "./filter/clientFilterLastN.pipe";
import {AddressFilterByStreetPipe} from "./filter/addressFilterByStreet.pipe";
import {BoxFilterByNamePipe} from "./filter/boxFilterByName.pipe";
import {OrderAddComponent} from './order-add/order-add.component';
import {OrderFilterByNamePipe} from "./filter/orderFilterByName.pipe";
import {OrderFilterByPricePipe} from "./filter/orderFilterByPrice.pipe";
import {OrderFilterByWeightPipe} from "./filter/orderFilterByWeight.pipe";
import {OrderFilterByLocCityPipe} from "./filter/orderFilterByLocCity.pipe";
import {OrderFilterByDestCityPipe} from "./filter/orderFilterByDestCity.pipe";
import { ClientComponent } from './client/client.component';
import { AddressComponent } from './address/address.component';
import { BoxComponent } from './box/box.component';
import {AddressFilterByCityPipe} from "./filter/addressFilterByCity.pipe";


@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    OrderDetailComponent,
    HomeComponent,
    DriverComponent,
    ManagerComponent,
    ClientFilterLastNPipe,
    AddressFilterByStreetPipe,
    BoxFilterByNamePipe,
    OrderFilterByNamePipe,
    OrderFilterByPricePipe,
    OrderFilterByWeightPipe,
    OrderFilterByLocCityPipe,
    OrderFilterByDestCityPipe,
    AddressFilterByCityPipe,
    OrderAddComponent,
    ClientComponent,
    AddressComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
