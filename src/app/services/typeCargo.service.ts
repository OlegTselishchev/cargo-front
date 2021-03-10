import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TypeCargo} from "../model/typeCargo.model";

@Injectable({providedIn: 'root'})
export class TypeCargoService {

  constructor(public http: HttpClient) {
  }

  //urlTypeCargo: string = 'https://app-cargo2020.herokuapp.com/type/';
  urlTypeCargo: string = 'http://localhost:9000/type/';

  public typeCargo: TypeCargo[] = [];
}
