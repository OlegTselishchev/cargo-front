import {Client} from './client.model';
import {Trailer} from './trailer.model';

export class Car{
  id?: number;
  name: string;
  volume: number;
  liftingCapacity: number;
  client: Client;
  trailer?: Trailer;
}
