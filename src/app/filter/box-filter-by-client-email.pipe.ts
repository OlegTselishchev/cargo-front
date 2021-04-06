import { Pipe, PipeTransform } from '@angular/core';
import {Box} from "../model/box.model";

@Pipe({
  name: 'boxFilterByClientEmail'
})
export class BoxFilterByClientEmailPipe implements PipeTransform {

  transform(box: Box[], search: string): Box[] {
    return box.filter(box => {
      if (box.client.email == null){
        return;
      }
      return box.client.email.includes(search)})
  }

}
