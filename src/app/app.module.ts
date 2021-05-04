import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
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
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddCarModel } from './add-car-model/add-car-model';
import { HeaderComponent } from './header/header.component';
import { OrderAddComponent } from './order-add/order-add.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { BoxFilterByClientEmailPipe } from './filter/box-filter-by-client-email.pipe';
import { OrderFilterByBoxClientEmailPipe } from './filter/order-filter-by-box-client-email.pipe';
import { ClientFilterByEmailPipe } from './filter/client-filter-by-email.pipe';
import { OrderFilterByDriverEmailPipe } from './filter/order-filter-by-driver-email.pipe';
import { OrderPricePipe } from './filter/order-price.pipe';
import { OrderFilterByTypePipe } from './filter/order-filter-by-type.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import { NotificationComponent } from './notification/notification.component';
import {ACCESS_USER_ID} from "./services/auth.service";
import {SingSingupFormaComponent} from "./sing-singup-forma/sing-singup-forma.component";
import { AddTrailerComponent } from './add-trailer/add-trailer.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CreateBoxComponent} from "./create-box/create-box.component";
import {LoaderComponent} from "./loader/loader.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { LoaderComponent } from './loader/loader.component';



export function tokenGetter(){
  return localStorage.getItem(ACCESS_USER_ID);
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
    OrderFilterByDriverEmailPipe,
    OrderPricePipe,
    OrderFilterByTypePipe,
    NotificationComponent,
    ProfileComponent,
    EditProfileComponent,
    AddCarModel,
    AddTrailerComponent,
    CreateBoxComponent,
    LoaderComponent,
  ],


  schemas: [
    CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,

    JwtModule.forRoot({
        config: {
          tokenGetter,
          disallowedRoutes: ["localhost:9000"]
        }
      }
    ),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
