import {Injectable} from "@angular/core";
import { Order } from "../model/order.model";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class OrderService {

  constructor(public http: HttpClient) {}

  //urlOrder: string = 'https://app-cargo2020.herokuapp.com/order/';
  urlOrder: string = 'http://localhost:9000/order/';

  public getOrderList(){
    return this.http.get(this.urlOrder);
  }

  public delete(id: number) {
    return this.http.delete(this.urlOrder + id);
  }

  public create(order: Order) {
    return this.http.post(this.urlOrder, order);
  }

  public modify(order: Order) {
    return this.http.patch(this.urlOrder, order);
  }

  public showOrderById(id: number): void {
    this.http.get(this.urlOrder+ "ByReceiver/" + id).subscribe((date: Order[]) => {
      this.ordersList = date;
    });
  }
}
