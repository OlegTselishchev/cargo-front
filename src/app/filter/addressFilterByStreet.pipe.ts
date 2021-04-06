import {Pipe, PipeTransform} from "@angular/core";
import {Address} from "../model/address.model";

@Pipe({name: 'addressFilterByStreet'})
export class AddressFilterByStreetPipe implements PipeTransform {
  transform(address: Address[], search: string): Address[] {
    return address.filter(a => {
      if (a.street == null){
        return;
      }
      return a.street.includes(search)});
  }

}
