import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {OrderService} from "../services/order.service";
import {Order} from "../model/order.model";
import {AddressService} from "../services/address.service";
import {Address} from "../model/address.model";
import {TypeCargo} from "../model/typeCargo.model";
import {TypeCargoService} from "../services/typeCargo.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,
              private orderService: OrderService,
              private addressService: AddressService,
              private typeService: TypeCargoService) { }

  public orderList: Order[] = [];
  public addressList: Address[] = [];
  public typeCargoList: TypeCargo[] = [];

  locCity: string;
  destCity: string;
  price: number;
  type: string;

  ngOnInit(): void {
    this.getOrders();
    this.getAddress();
    this.getType();
  }

  public get isLoggedIn(): boolean{
    return this.authService.isAuthenticated()
  }

  public getAddress(): void{
    this.addressService.getAddressAll().subscribe((data: Address[])=>{this.addressList = data;});
  }

  public getType(): void{
    this.typeService.getType().subscribe((data: TypeCargo[])=>{this.typeCargoList = data});
  }

  public getOrders(): void{
      this.orderService.getOrderList().subscribe((data: Order[]) => {
          this.orderList = data
        },
        error => {
          alert('error get orders')
        },
        () => {
          console.log('getOrders-OK')
        });
  }
}
