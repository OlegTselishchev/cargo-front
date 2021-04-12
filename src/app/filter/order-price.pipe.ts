import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "../model/order.model";

@Pipe({
  name: 'orderPrice'
})
export class OrderPricePipe implements PipeTransform {
  transform(order: Order[], search: number): Order[] {
    if (order != null) {
      return order.filter(order => {
        return order.price <= search;
      });
    }
  }

}
