import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AddressService} from "../services/address.service";
import {Address} from "../model/address.model";
import {Location} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import { MatTableFilter } from 'mat-table-filter';
import {MatTableDataSource} from "@angular/material/table";

import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  displayedColumns: string[] = ['country', 'city', 'street','home','apartment'];
  dataSource: any;

  public pageSize = 1;

  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  public address: Address = new Address();
  public searchByStreet: string = '';
  public searchByCity: string = '';

  public addressList: Address[];

  constructor(public addressService: AddressService,
              public location: Location,
              public notificationService: NotificationService) { }

  ngOnInit(): void {
   this.getAddressAll();

    this.addressService.getAddressAll().subscribe((result: Address[])=>{
      let array = [];
      result.forEach(function(item) {
        console.log(item.country + "111");
        array.push({"country":item.country, "city":item.city, "street":item.street,"home":item.home,
          "apartment":item.apartment});
      })
      this.dataSource  = new MatTableDataSource<any>(array);
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAddressAll():void{
    this.addressService.getAddressAll().subscribe((data:Address[]) => {this.addressList = data;},
      error => {
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{
        this.notificationService.add('getOk');
        setTimeout(()=>{this.notificationService.remove('getOk')}, 2000);});
  }

  delete(id: number) : void {
      this.addressService.delete(id).subscribe(() => {
        },
        error => {
          this.notificationService.add('deleteError', id);
          setTimeout(()=>{this.notificationService.remove('deleteError')}, 2000);
        },
        () => {
          this.getAddressAll();
          this.notificationService.add('deleteOk', id);
          setTimeout(()=>{this.notificationService.remove('deleteOk')}, 2000);
        });
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
        error => {
          this.notificationService.add('createError');
          setTimeout(()=>{this.notificationService.remove('createError')}, 2000);
          },
        ()=>{
          this.getAddressAll();
          this.notificationService.add('createOk');
          setTimeout(()=>{this.notificationService.remove('createOk')}, 2000);
          }
        );

      this.address.country = '';
      this.address.city = '';
      this.address.street = '';
      this.address.home = '';
      this.address.apartment = '';
    } else {
      this.notificationService.add('dataError');
      setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
