import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class StatusService {

  constructor(public http: HttpClient) {
  }

  statusUrl: string = 'https://app-cargo2020.herokuapp.com/status/';
  //statusUrl: string = 'http://localhost:9000/status/';

  public getStatus(){
    return this.http.get(this.statusUrl);
  }
}
