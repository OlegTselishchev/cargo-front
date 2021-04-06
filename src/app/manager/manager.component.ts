import { Component, OnInit } from '@angular/core';
import { OrderService} from "../services/order.service";
import {AuthService} from "../services/auth.service";
import {Status} from "../model/status.model";
import {Order} from "../model/order.model";
import {StatusService} from "../services/status.service";


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(public orderService: OrderService,
              private authService: AuthService,
              private statusService: StatusService) { }

  searchOrderName: string = '';
  searchOrderPrice: string = '';
  searchOrderWeight: string = '';
  searchOrderLocCity: string = '';
  searchOrderDestCity: string = '';
  searchOrderByBoxClientEmail: string = this.authService.getAuthEmail();

  ngOnInit(): void {
    this.showAllOrder();
    this.statusService.showAllStatus();
  }

  showAllOrder(): void {
    this.orderService.showAllOrder();
  }

  public deleteById(id: number): void {
    this.orderService.delete(id);
  }

  public closeById(id: number): void {

    let status: Status = this.statusService.statusList.find(x => x.name == 'close');

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
      if(order.status != null){
        this.orderService.modify(order);
      }else {alert('not driver or status')}
    }else {alert('not id order for modify')}

  }

}
