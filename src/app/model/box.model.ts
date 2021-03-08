import {Client} from './client.model';
import {TypeCargo} from './typeCargo.model';

export class Box {
  boxId: number;
  name: string;
  height: number;
  width: number;
  volume: number;
  weight: number;
  client: Client;
  typeCargo: TypeCargo;
}
