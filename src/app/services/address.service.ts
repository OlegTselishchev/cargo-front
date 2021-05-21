import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Address} from "../model/address.model";

@Injectable({providedIn: 'root'})
export class AddressService {

  constructor(public http: HttpClient) {}

  urlAddress: string = 'https://app-cargo2020.herokuapp.com/address/';
  // urlAddress: string = 'http://localhost:9000/address/';

  public getAddressAll() {
    return this.http.get(this.urlAddress);
  }

  public getAddressAllCityDistinct() {
    return this.http.get(this.urlAddress + 'city');
  }

  public delete(id: number)  {
    return this.http.delete(this.urlAddress + id);
  }

  public create(address: Address)  {
    return this.http.post(this.urlAddress, address);
  }
}
