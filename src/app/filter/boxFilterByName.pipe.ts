import {Pipe, PipeTransform} from "@angular/core";
import {Box} from "../model/box.model";

@Pipe({name: 'boxFilterByName'})
export class BoxFilterByNamePipe implements PipeTransform {
  transform(box: Box[], search: string): Box[] {
    return box.filter(box => {return box.name.includes(search)})
  }

}
