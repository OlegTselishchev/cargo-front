import {Pipe, PipeTransform} from "@angular/core";
import {Client} from "../model/client.model";

@Pipe({name: 'clientFilterByLastN'})
export class ClientFilterLastNPipe implements PipeTransform {
  transform(client: Client[], search: string): Client[] {
    return client.filter(c => {return c.lastName.includes(search)});
  }
}
