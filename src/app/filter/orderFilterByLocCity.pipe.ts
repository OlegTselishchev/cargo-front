import {Pipe, PipeTransform} from "@angular/core";
import {Order} from "../model/order.model";

@Pipe({name: 'orderFilterByLocCity'})
export class OrderFilterByLocCityPipe implements PipeTransform {
  transform(order: Order[], search: string): Order[] {
    return order.filter(order => {return order.location.city.includes(search)});
  }
}
