import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "../model/order.model";

@Pipe({
  name: 'orderFilterByType'
})
export class OrderFilterByTypePipe implements PipeTransform {

  transform(order: Order[], search: string): Order[] {
    if (order != null) {
      return order.filter(order => {
        return order.box.typeCargo.name.includes(search);
      });
    }
  }

}
