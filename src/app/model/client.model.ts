import {Car} from './car.model';

export class Client{
  userId?: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email: string;
  driveCategory: string;
  car?: Car;
  password?: string;
}
