import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Status} from "../model/status.model";


@Injectable({providedIn: 'root'})
export class StatusService {

  constructor(public http: HttpClient) {
  }

  //statusUrl: string = 'https://app-cargo2020.herokuapp.com/status/';
  statusUrl: string = 'http://localhost:9000/status/';

  statusList: Status[] = [];

  public showAllStatus(): void {
    this.http.get(this.statusUrl).subscribe((date: Status[]) => {
      this.statusList = date;
    });
  }
}
