import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "../model/order.model";

@Pipe({
  name: 'orderFilterByDriverEmail'
})
export class OrderFilterByDriverEmailPipe implements PipeTransform {

  transform(order: Order[], search: string): Order[] {
    if (order != null) {
      return order.filter(order => {
        if (order.driver.email == null) {
          return;
        }
        return order.driver.email.includes(search)
      });
    }
  }
}
