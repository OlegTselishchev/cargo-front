import {Pipe, PipeTransform} from "@angular/core";
import {Order} from "../model/order.model";

@Pipe({name: 'orderFilterByWeight'})
export class OrderFilterByWeightPipe implements PipeTransform {
  transform(order: Order[], search: string): Order[] {
    return order.filter(order => {return order.box.weight.toString().includes(search)});
  }
}
