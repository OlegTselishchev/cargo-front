import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Client} from "../model/client.model";
import {observable, Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class ClientService {

  constructor(public http: HttpClient) {
  }

  urlClient: string = 'https://app-cargo2020.herokuapp.com/client';
  //urlClient: string = 'http://localhost:9000/client/';

  public getClientAll() {
    return this.http.get(this.urlClient);
  }

  public getClientAllByLastNameNotNull() {
    return this.http.get(this.urlClient + 'notnull');
  }

  public getClientByEmail(email: string) {
    return this.http.get(this.urlClient + 'email/' + email);
  }

  public delete(id: number) {
    return this.http.delete(this.urlClient + id);
  }

  public create(client: Client) {
    return this.http.post(this.urlClient, client);
  }


  public showById(id: number): Observable<any> {
    return this.http.get(this.urlClient + id);
  }

  public modify(client: Client): Observable<any> {
    return this.http.patch(this.urlClient, client, {observe: 'response'});
  }
}
