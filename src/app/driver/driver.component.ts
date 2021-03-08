import { Component, OnInit } from '@angular/core';
import { OrderService} from "../services/order.service";
import {Client} from "../model/client.model";
import {Order} from "../model/order.model";
import {Status} from "../model/status.model";
import {ClientService} from "../services/client.service";

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  constructor(public orderService: OrderService,
              public clientService: ClientService) { }

  STATUS_OPEN = 22;
  STATUS_IN_WORK = 23;

  driver1: Client = new Client();
  searchDriverLastName: string = '';

  searchOrderName: string = '';
  searchOrderPrice: string = '';
  searchOrderWeight: string = '';
  searchOrderLocCity: string = '';
  searchOrderDestCity: string = '';


  ngOnInit(): void {
    this.showAllOrder();
    this.clientService.showAllClient();
  }
  showAllOrder(): void {
    this.orderService.showAllOrder();
  }

  public modifyById(id: number): void {

    const status: Status = {id: this.STATUS_IN_WORK};

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
        if(order.driver.userId != null){
          this.orderService.modify(order);
        }else {alert('not id driver')}
      }else {alert('not id order for modify')}
  }

  public back(id: number): void {

    const status: Status = {
      id: this.STATUS_OPEN
    };
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
    if(id != null){
        this.orderService.modify(order);
    }else {alert('not id order for modify')}
  }

  add(id: number, ln: string, fn: string, mn: string): void {
    this.driver1.userId = id;
    this.driver1.lastName = ln;
    this.driver1.firstName = fn;
    this.driver1.middleName = mn;
  }

}
