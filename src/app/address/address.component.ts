import { Component, OnInit } from '@angular/core';
import {AddressService} from "../services/address.service";
import {Address} from "../model/address.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public address: Address = new Address();
  public searchByStreet: string = '';
  public searchByCity: string = '';

  public addressList: Address[];

  constructor(public addressService: AddressService, public location: Location) { }

  ngOnInit(): void {
   this.getAddressAll();
  }

  getAddressAll():void{
    this.addressService.getAddressAll().subscribe((data:Address[]) => this.addressList = data);
  }

  delete(id: number) : void {
    this.addressService.delete(id).subscribe(()=>{},
      error => {alert('error address delete')},
      ()=>{this.getAddressAll()});
  }

  addAddress(): void {

    const address: Address = {
      country: this.address.country,
      city: this.address.city,
      street: this.address.street,
      home: this.address.home,
      apartment: this.address.apartment
    };

    if (address.city != null && address.city !== '' &&
      address.country != null && address.country !== '' &&
      address.street != null && address.street !== '' &&
      address.home != null && address.home !== '' &&
      address.apartment != null && address.apartment !== '') {

      this.addressService.create(address).subscribe(()=>{},
        error => {alert('error address clear')},
        ()=>{this.getAddressAll()}
        );

      this.address.country = '';
      this.address.city = '';
      this.address.street = '';
      this.address.home = '';
      this.address.apartment = '';
    } else { alert('введите адрес'); }
  }

  goBack(): void {
    this.location.back();
  }
}
