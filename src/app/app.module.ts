import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { JwtModule } from "@auth0/angular-jwt";

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
import {OrderFilterByNamePipe} from "./filter/orderFilterByName.pipe";
import {OrderFilterByPricePipe} from "./filter/orderFilterByPrice.pipe";
import {OrderFilterByWeightPipe} from "./filter/orderFilterByWeight.pipe";
import {OrderFilterByLocCityPipe} from "./filter/orderFilterByLocCity.pipe";
import {OrderFilterByDestCityPipe} from "./filter/orderFilterByDestCity.pipe";
import { ClientComponent } from './client/client.component';
import { AddressComponent } from './address/address.component';
import { BoxComponent } from './box/box.component';
import {AddressFilterByCityPipe} from "./filter/addressFilterByCity.pipe";
import { ProfileComponent } from './profile/profile.component';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddCarModel } from './add-car-model/add-car-model';
import { HeaderComponent } from './header/header.component';
import { SingSingupFormaComponent } from './sing-singup-forma/sing-singup-forma.component';
import { OrderAddComponent } from './order-add/order-add.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {ACCESS_TOKEN_KEY} from "./services/auth.service";
import { BoxFilterByClientEmailPipe } from './filter/box-filter-by-client-email.pipe';
import { OrderFilterByBoxClientEmailPipe } from './filter/order-filter-by-box-client-email.pipe';
import { ClientFilterByEmailPipe } from './filter/client-filter-by-email.pipe';
import { OrderFilterByDriverEmailPipe } from './filter/order-filter-by-driver-email.pipe';


export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

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
    ClientComponent,
    AddressComponent,
    BoxComponent,
    HeaderComponent,
    SingSingupFormaComponent,
    OrderAddComponent,
    BoxFilterByClientEmailPipe,
    OrderFilterByBoxClientEmailPipe,
    ClientFilterByEmailPipe,
    OrderFilterByDriverEmailPipe

    BoxComponent,
    ProfileComponent,
    EditProfileComponent,
    AddCarModel
  ],
  imports: [
    NgbPaginationModule,
    NgbAlertModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
    FormsModule,

    JwtModule.forRoot({
        config: {
          tokenGetter,
          disallowedRoutes:["localhost:9000"]
        }
      }
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
