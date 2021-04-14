import { Pipe, PipeTransform } from '@angular/core';
import {Box} from "../model/box.model";

@Pipe({
  name: 'boxFilterByClientEmail'
})
export class BoxFilterByClientEmailPipe implements PipeTransform {

  transform(box: Box[], search: string): Box[] {
    if (box != null) {
      return box.filter(box => {
        if (box.client.email == null) {
          return;
        }
        return box.client.email.includes(search)
      })
    }
  }
}
