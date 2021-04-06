import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TypeCargo} from "../model/typeCargo.model";
import {Status} from "../model/status.model";

@Injectable({providedIn: 'root'})
export class TypeCargoService {

  constructor(public http: HttpClient) {
  }

  //urlTypeCargo: string = 'https://app-cargo2020.herokuapp.com/type/';
  urlType: string = 'http://localhost:9000/type/';

  public typeCargoList: TypeCargo[] = [];

  public showAllTypes(): void {
    this.http.get(this.urlType).subscribe((date: TypeCargo[]) => {
      this.typeCargoList = date;
    });
  }
}
