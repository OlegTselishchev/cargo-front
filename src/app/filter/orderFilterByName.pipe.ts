import {Pipe, PipeTransform} from "@angular/core";
import {Order} from "../model/order.model";

@Pipe({name: 'orderFilterByName'})
export class OrderFilterByNamePipe implements PipeTransform {
  transform(order: Order[], search: string): Order[] {
    if (order != null) {
      return order.filter(order => {
        if (order.id == null) {
          return;
        }
        return order.id.toString().includes(search)
      });
    }
  }
}
