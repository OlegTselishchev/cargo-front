import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Trailer} from "../model/trailer.model";

@Injectable({providedIn: 'root'})
export class TrailerService {

  constructor(public http: HttpClient) {
  }

  //urlTrailer: string = 'https://app-cargo2020.herokuapp.com/trailer/';
  urlTrailer: string = 'http://localhost:9000/trailer/';

  public trailerList: Trailer[] = [];

}
