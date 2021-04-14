import {Pipe, PipeTransform} from "@angular/core";
import {Order} from "../model/order.model";

@Pipe({name: 'orderFilterByLocCity'})
export class OrderFilterByLocCityPipe implements PipeTransform {
  transform(order: Order[], search: string): Order[] {
    if (order != null) {
      return order.filter(order => {
        if (order.location.city == null) {
          return;
        }
        return order.location.city.includes(search)
      });
    }
  }
}
