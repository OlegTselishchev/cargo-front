import {Pipe, PipeTransform} from "@angular/core";
import {Order} from "../model/order.model";

@Pipe({name: 'orderFilterByPrice'})
export class OrderFilterByPricePipe implements PipeTransform {
  transform(order: Order[], search: string): Order[] {
    return order.filter(order => {
      if (order.price == null){
        return;
      }
      return order.price.toString().includes(search)});
  }
}
