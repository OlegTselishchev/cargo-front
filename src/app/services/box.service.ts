import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Box} from "../model/box.model";


@Injectable({providedIn: 'root'})
export class BoxService {

  constructor(public  http: HttpClient) {
  }

  //boxUrl: string = 'https://app-cargo2020.herokuapp.com/box/';
  boxUrl: string = 'http://localhost:9000/box/';

  public getBoxAll(){
    return this.http.get(this.boxUrl);
  }

  public getBoxById(id: number){
    return this.http.get(this.boxUrl + id);
  }

  public create(box: Box) {
    return this.http.post(this.boxUrl, box);
  }
}
