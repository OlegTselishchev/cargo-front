import {Pipe, PipeTransform} from "@angular/core";
import {Address} from "../model/address.model";

@Pipe({name: 'addressFilterByCity'})
export class AddressFilterByCityPipe implements PipeTransform {
  transform(address: Address[], search: string): Address[] {
    return address.filter(a => {return a.city.includes(search)});
  }
}
