import {Pipe, PipeTransform} from "@angular/core";
import {Client} from "../model/client.model";

@Pipe({name: 'clientFilterByLastN'})
export class ClientFilterLastNPipe implements PipeTransform {
  transform(client: Client[], search: string): Client[] {
    if (client != null) {
      return client.filter(c => {
        if (c.lastName == null) {
          return;
        }
        return c.lastName.includes(search)
      });
    }
  }
}
