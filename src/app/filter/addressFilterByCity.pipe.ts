import {Pipe, PipeTransform} from "@angular/core";
import {Address} from "../model/address.model";

@Pipe({name: 'addressFilterByCity'})
export class AddressFilterByCityPipe implements PipeTransform {
  transform(address: Address[], search: string): Address[] {
    if (address != null) {
      return address.filter(a => {
        if (a.city == null) {
          return;
        }
        return a.city.includes(search)
      });
    }
  }
}
