import { Component, OnInit } from '@angular/core';
import {AddressService} from "../services/address.service";
import {ClientService} from "../services/client.service";
import {BoxService} from "../services/box.service";
import {Address} from "../model/address.model";
import {Box} from "../model/box.model";
import {Client} from "../model/client.model";
import {Status} from "../model/status.model";
import {Order} from "../model/order.model";
import {OrderService} from "../services/order.service";
import {Location} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {StatusService} from "../services/status.service";

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  constructor(  public addressService: AddressService,
                public clientService: ClientService,
                public boxService: BoxService,
                public orderService: OrderService,
                public location: Location,
                public authService: AuthService,
                public statusService: StatusService
  ) { }

  public addressList: Address[] = [];
  public clientList: Client[] = [];
  public boxList: Box[] = [];
  public statusList: Status[] = [];

  ngOnInit(): void {
    this.showBox();
    this.showClient();
    this.showAddress();
    this.showStatus();
  }

  dest: Address = new Address();
  loc: Address = new Address();
  box: Box = new Box();
  receiver: Client = new Client();

  searchDest: string = '';
  searchLoc: string = '';
  searchBox: string = '';
  searchBoxClientEmail: string = this.authService.getAuthEmail();
  searchRec: string = '';


  create(): void {
    let status: Status = this.statusList.find(x => x.name == 'open');

    let price1 = 0;

    if (this.box.boxId != null) {
      let boxById: Box[] = this.boxList.filter(box => box.boxId == this.box.boxId);
      let box: Box = boxById[0];
      price1 = box.weight * 500;
    };

    const order: Order = {
      name: 'order',
      destination: this.dest,
      location: this.loc,
      box: this.box,
      price: price1,
      receiver: this.receiver,
      status: status,
      driver: null
    };

    if (order.receiver.userId != null && order.box.boxId != null &&
      order.location.addressId != null && order.destination.addressId != null &&
      order.price != null && order.status.id != null
    ) {
      this.orderService.create(order).subscribe(()=>{},
        error => {alert('error order create')},
        ()=>{console.log('order created')});
    } else {
      alert('введи все данные');
    }
    this.box.boxId = null;
    this.box.name = '';
    this.loc.addressId = null;
    this.loc.city = '';
    this.dest.addressId = null;
    this.dest.city = '';
    this.receiver.userId = null;
    this.receiver.lastName = '';
  }


  addReceiver(id: number, ln: string, fn: string): void {
    this.receiver.userId = id;
    this.receiver.lastName = ln;
    this.receiver.firstName = fn;
  }

  addBox(id: number, name: string): void {
    this.box.boxId = id;
    this.box.name = name;
  }

  addLoc(id: number, country: string, city: string, street: string, home: string, apart: string): void {
    this.loc.addressId = id;
    this.loc.country = country;
    this.loc.city = city
    this.loc.street = street;
    this.loc.home = home;
    this.loc.apartment = apart;
  }

  addDest(id: number, country: string, city: string, street: string, home: string, apart: string): void {
    this.dest.addressId = id;
    this.dest.country = country;
    this.dest.city = city
    this.dest.street = street;
    this.dest.home = home;
    this.dest.apartment = apart;
  }

  goBack(): void {
    this.location.back();
  }

  showBox():void{
    this.boxService.getBoxAll().subscribe((data: Box[]) => {this.boxList = data});
  }

  showAddress():void{
    this.addressService.getAddressAll().subscribe((data: Address[]) => {this.addressList = data});
  }

  showClient():void{
    this.clientService.getClientAll().subscribe((data: Client[]) => {this.clientList = data});
  }

  showStatus():void{
    this.statusService.getStatus().subscribe((data: Status[]) => {this.statusList = data});
  }

}
