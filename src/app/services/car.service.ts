import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Car} from "../model/car.model";


@Injectable({providedIn: 'root'})
export class CarService {

  constructor(public http: HttpClient) {
  }

  urlCar: string = 'https://app-cargo2020.herokuapp.com/car/';
  //urlCar: string = 'http://localhost:9000/car/';

  public carList: Car[] = [];
}
