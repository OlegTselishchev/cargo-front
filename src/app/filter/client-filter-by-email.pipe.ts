import { Pipe, PipeTransform } from '@angular/core';
import {Client} from "../model/client.model";

@Pipe({
  name: 'clientFilterByEmail'
})
export class ClientFilterByEmailPipe implements PipeTransform {

  transform(client: Client[], search: string): Client[] {
    if (client != null) {
      return client.filter(c => {
        if (c.email == null) {
          return;
        }
        return c.email.includes(search)
      });
    }
  }
}
