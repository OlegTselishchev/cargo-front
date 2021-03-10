import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Address} from "../model/address.model";

@Injectable({providedIn: 'root'})
export class AddressService {

  constructor(public http: HttpClient) {}

  //urlAddress: string = 'https://app-cargo2020.herokuapp.com/address/';
  urlAddress: string = 'http://localhost:9000/address/';

  public addressList: Address[] = []

  public showAllAddress(): void {
    this.http.get(this.urlAddress).subscribe((date: Address[]) => {
      this.addressList = date;
    });
  }

  delete(id: number) : void {
    this.http.delete(this.urlAddress + id).subscribe(()=>{},
      error => {alert('error')},
      ()=>{this.addressList = this.addressList.filter(a => a.addressId !== id);});
  }

  create(address: Address) : void {
    this.http.post(this.urlAddress, address).subscribe(()=>{},
      error => {alert('error')},
      ()=>{this.showAllAddress()});
  }
}
