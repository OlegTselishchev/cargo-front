import { Component, OnInit } from '@angular/core';
import { OrderService} from "../services/order.service";
import {Client} from "../model/client.model";
import {Order} from "../model/order.model";
import {Status} from "../model/status.model";
import {ClientService} from "../services/client.service";
import {AuthService} from "../services/auth.service";
import {StatusService} from "../services/status.service";

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  constructor(public orderService: OrderService,
              public clientService: ClientService,
              private authService: AuthService,
              public statusService: StatusService) { }

  public statusList: Status[] = [];
  public clientList: Client[] = [];
  public orderList: Order[] = [];

  driver1: Client = new Client();
  searchDriverLastName: string = '';
  searchDriverByEmail: string = this.authService.getAuthEmail();
  isOrderFull: boolean = true;

  searchOrderName: string = '';
  searchOrderPrice: string = '';
  searchOrderWeight: string = '';
  searchOrderLocCity: string = '';
  searchOrderDestCity: string = '';


  ngOnInit(): void {
    this.showAllOrder();
    this.showClientAll();
    this.showStatusAll();
  }

  showAllOrder(): void {
    this.orderService.getOrderList().subscribe((data:Order[])=>{this.orderList = data});
  }

  showClientAll(): void{
    this.clientService.getClientAll().subscribe((data:Client[])=>{this.clientList = data});
  }

  showStatusAll(): void{
    this.statusService.getStatus().subscribe((data: Status[])=> {this.statusList = data});
  }

  public modifyByIdStatusInWork(id: number): void {

    let status: Status = this.statusList.find(x => x.name == 'in_work');

    const order: Order = {
      id: id,
      name: null,
      destination: null,
      location: null,
      box: null,
      price: null,
      receiver: null,
      status: status,
      driver: this.driver1
    };
      if(id != null){
        if(order.driver.userId != null && order.status != null){
          this.orderService.modify(order).subscribe(()=>{},
            error => {alert('error order modify')},
            ()=>{this.showAllOrder()});
        }else {alert('not driver or status')}
      }else {alert('not id order for modify')}
  }


  public modifyByIdStatusImplemented(id: number): void {

    let key1 = prompt('Введи ключ');
    let key2: string = '0000';

    if(key1 == key2) {

      let status: Status = this.statusList.find(x => x.name == 'implemented');

      const order: Order = {
        id: id,
        name: null,
        destination: null,
        location: null,
        box: null,
        price: null,
        receiver: null,
        status: status,
        driver: this.driver1
      };
      if (id != null) {
        if (order.driver.userId != null && order.status != null) {
          this.orderService.modify(order).subscribe(()=>{},
            error => {alert('error order modify')},
            ()=>{this.showAllOrder()});
        } else {
          alert('not driver or status')
        }
      } else {
        alert('not id order for modify')
      }
    }else alert('Неверный ключ')
  }


  public back(id: number): void {

    let status: Status = this.statusList.find(x => x.name == 'open');

    const order: Order = {
      id: id,
      name: null,
      destination: null,
      location: null,
      box: null,
      price: null,
      receiver: null,
      status: status,
      driver: null
    };
    if(id != null && order.status != null){
        this.orderService.modify(order).subscribe(()=>{},
          error => {alert('error order modify')},
          ()=>{this.showAllOrder()});
    }else {alert('not id order for modify or status')}
  }

  add(id: number, ln: string, fn: string, mn: string): void {
    this.driver1.userId = id;
    this.driver1.lastName = ln;
    this.driver1.firstName = fn;
    this.driver1.middleName = mn;
  }

  myOrder(): void {
    this.isOrderFull = false;
  }

  fullOrders():void {
    this.isOrderFull = true;
  }

}
