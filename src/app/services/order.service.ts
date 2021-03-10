import {Injectable} from "@angular/core";
import { Order } from "../model/order.model";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class OrderService {

  constructor(public http: HttpClient) {}

  //urlOrder: string = 'https://app-cargo2020.herokuapp.com/order/';
  urlOrder: string = 'http://localhost:9000/order/';

  public ordersList: Order[] = [];

  public showAllOrder(): void {
    this.http.get(this.urlOrder).subscribe((date: Order[]) => {
      this.ordersList = date;
    });
  }

  public delete(id: number): void {
    this.http.delete(this.urlOrder + id).subscribe(()=>{},
      error => {alert('error')},
      ()=>{this.ordersList = this.ordersList.filter(ord => ord.id !== id);});

  }

  public create(order: Order): void {
    this.http.post(this.urlOrder, order).subscribe(()=>{},
      error => {alert('error')},
      ()=>{ this.showAllOrder(); console.log('ok')});

  }

  public modify(order: Order): void {
    this.http.patch(this.urlOrder, order).subscribe(()=>{},
      error => {alert('error')},
      ()=>{this.showAllOrder();});

  }
}
