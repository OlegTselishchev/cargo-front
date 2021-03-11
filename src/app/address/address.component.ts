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

  constructor(public addressService: AddressService, public location: Location) { }

  ngOnInit(): void {
  }

  showAddress(): void {
    this.addressService.showAllAddress();
  }

  delete(id: number) : void {
    this.addressService.delete(id);
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

      this.addressService.create(address);

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
