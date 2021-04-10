import {Pipe, PipeTransform} from "@angular/core";
import {Order} from "../model/order.model";

@Pipe({name: 'orderFilterByWeight'})
export class OrderFilterByWeightPipe implements PipeTransform {
  transform(order: Order[], search: string): Order[] {
    if (order != null) {
      return order.filter(order => {
        if (order.box.weight == null) {
          return;
        }
        return order.box.weight.toString().includes(search)
      });
    }
  }
}
