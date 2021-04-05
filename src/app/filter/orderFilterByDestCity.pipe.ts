import {Pipe, PipeTransform} from "@angular/core";
import {Order} from "../model/order.model";

@Pipe({name: 'orderFilterByDestCity'})
export class OrderFilterByDestCityPipe implements PipeTransform {
  transform(order: Order[], search: string): Order[] {
    return order.filter(order => {
      if (order.destination.city == null){
        return;
      }
      return order.destination.city.includes(search)});
  }
}
