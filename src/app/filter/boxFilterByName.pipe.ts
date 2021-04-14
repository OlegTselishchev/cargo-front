import {Pipe, PipeTransform} from "@angular/core";
import {Box} from "../model/box.model";

@Pipe({name: 'boxFilterByName'})
export class BoxFilterByNamePipe implements PipeTransform {
  transform(box: Box[], search: string): Box[] {
    if (box != null) {
      return box.filter(box => {
        if (box.name == null) {
          return;
        }
        return box.name.includes(search)
      })
    }
  }
}
