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

  public statusList: Status[] = [];
  public orderList: Order[] = [];

  searchOrderName: string = '';
  searchOrderPrice: string = '';
  searchOrderWeight: string = '';
  searchOrderLocCity: string = '';
  searchOrderDestCity: string = '';
  searchOrderByBoxClientEmail: string = this.authService.getAuthEmail();

  ngOnInit(): void {
    this.showAllOrder();
    this.getStatus();
  }

  showAllOrder(): void {
    this.orderService.getOrderList().subscribe((data:Order[])=>{this.orderList = data});
  }

  getStatus(): void{
    this.statusService.getStatus().subscribe((data:Status[])=>{this.statusList = data});
  }

  public deleteById(id: number): void {
    this.orderService.delete(id).subscribe(()=>{},
      error => {alert('error order delete')},
      ()=>{this.showAllOrder()});
  }

  public closeById(id: number): void {

    let status: Status = this.statusList.find(x => x.name == 'close');

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
        this.orderService.modify(order).subscribe(()=>{},
          error => {alert('error order modify')},
          ()=>{this.showAllOrder()});
      }else {alert('not driver or status')}
    }else {alert('not id order for modify')}

  }

}
