import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Trailer} from "../model/trailer.model";

@Injectable({providedIn: 'root'})
export class TrailerService {

  constructor(public http: HttpClient) {
  }

  //urlTrailer: string = 'https://app-cargo2020.herokuapp.com/trailer/';
  urlTrailer: string = 'http://localhost:9000/trailer/';

  public create(trailer: Trailer): Observable<any> {
    return this.http.post(this.urlTrailer, trailer, {observe: 'response'});
  }

  public delete(id: number) : Observable<any>  {
    return this.http.delete(this.urlTrailer + id);
  }

}
