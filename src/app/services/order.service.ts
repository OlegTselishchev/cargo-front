import {Injectable} from "@angular/core";
import { Order } from "../model/order.model";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class OrderService {

  constructor(public http: HttpClient) {}

  //urlOrder: string = 'https://app-cargo2020.herokuapp.com/order/';
  urlOrder: string = 'http://localhost:9000/order/';

  public getOrderList(){
    return this.http.get(this.urlOrder);
  }

  public getOrderListByBoxClientIdAndNotStatus(id: string, status: string ){
    return this.http.get(this.urlOrder + 'boxClientIdAndNotStatus/' + id + '/' + status);
  }

  public getOrderListByLocDestTypePrice(locCity: string, destCity: string, idType: number, price: number){
    return this.http.get(this.urlOrder + 'byLocDestTypePrice/' + locCity + '/' + destCity + '/' +idType + '/' + price);
  }

  public getOrderListByBoxClientIdAndStatus(id: string, status: string ){
    return this.http.get(this.urlOrder + 'boxClientIdAndStatus/' + id + '/' + status);
  }

  public getOrderListByDriverIdAndStatus(id: string, status: string ){
    return this.http.get(this.urlOrder + 'driverIdAndStatus/' + id + '/' + status);
  }

  public getOrderListByStatus(status: string ){
    return this.http.get(this.urlOrder + 'status/' + status);
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

  public showOrderById(id: number): Observable<any> {
    return this.http.get(this.urlOrder+ "ByReceiver/" + id);
  }
}
