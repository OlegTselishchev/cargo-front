import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Car} from "../model/car.model";
import {Observable} from "rxjs";



@Injectable({providedIn: 'root'})
export class CarService {

  constructor(public http: HttpClient) {
  }

  urlCar: string = 'https://app-cargo2020.herokuapp.com/car/';
  //urlCar: string = 'http://localhost:9000/car/';



  public create(car: Car): Observable<any> {
    return this.http.post(this.urlCar, car, {observe: 'response'});
  }

  public delete(id: number) : Observable<any>  {
    return this.http.delete(this.urlCar + id);
  }


}
