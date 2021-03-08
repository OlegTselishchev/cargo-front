import {Address} from './address.model';
import {Client} from './client.model';
import {Box} from './box.model';
import {Status} from './status.model';

export class Order {
  id?: number;
  name?: string;
  destination: Address;
  location: Address;
  driver: Client;
  box: Box;
  price?: number;
  receiver: Client;
  status: Status;
}
