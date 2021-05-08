import { Component, OnInit } from '@angular/core';
import { Order } from "../model/order.model";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { OrderService} from "../services/order.service";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(public route: ActivatedRoute,
              public location: Location,
              public orderService: OrderService,
              public notificationService: NotificationService) { }

  public orderList: Order[] = [];
  public orderDet: Order[] = [];
  public isLoaderOrderList: boolean = false;

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(): void{
    this.orderService.getOrderList().subscribe((data:Order[])=>{this.orderList = data},
      error => {
      this.isLoaderOrderList = false;
      this.notificationService.add('getError');
      setTimeout(()=>{this.notificationService.remove('getError')}, 2000)},
      ()=>{
      this.isLoaderOrderList = true;
      this.getOrderDetails();});
  }

  getOrderDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.orderDet = this.orderList.filter(o => o.id == id);
    this.notificationService.add('getOk', id);
    setTimeout(()=>{this.notificationService.remove('getOk')}, 2000);
  }

  goBack(): void {
    this.location.back();
  }
}
