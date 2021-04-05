import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "../model/order.model";

@Pipe({
  name: 'orderFilterByBoxClientEmail'
})
export class OrderFilterByBoxClientEmailPipe implements PipeTransform {

  transform(order: Order[], search: string): Order[] {
    return order.filter(order => {
      if (order.box.client.email == null){
        return;
      }
      return order.box.client.email.includes(search)});
  }

}
