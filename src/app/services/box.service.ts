import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Box} from "../model/box.model";
import {Client} from "../model/client.model";


@Injectable({providedIn: 'root'})
export class BoxService {

  constructor(public  http: HttpClient) {
  }

  //boxUrl: string = 'https://app-cargo2020.herokuapp.com/box/';
  boxUrl: string = 'http://localhost:9000/box/';

  public boxList: Box[] = [];
  public box: Box = new Box();



  public showAllBox(): void {
    this.http.get(this.boxUrl).subscribe((date: Box[]) => {
      this.boxList = date;
    });
  }

  public showBoxById(id: number): void {
    this.http.get(this.boxUrl + id).subscribe((box: Box)  => {this.box = box;},
      () => {console.log('error showBoxById')},
      () => {console.log('ok')});
  };

  public create(box: Box): void {
    this.http.post(this.boxUrl, box).subscribe(()=>{},
      error => {alert('error')},
      ()=>{this.showAllBox()});

  }

}
