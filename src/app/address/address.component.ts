import {Component,OnInit, ViewChild} from '@angular/core';
import {AddressService} from "../services/address.service";
import {Address} from "../model/address.model";
import {Location} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  displayedColumns: string[] = ['addressId','country', 'city', 'street','home','apartment', 'delete'];
  dataSource: any;

  public pageSize = 1;

  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  public address: Address = new Address();

  constructor(public addressService: AddressService,
              public location: Location,
              public notificationService: NotificationService) { }

  isLauderAddress: boolean = false;

  ngOnInit(): void {
    this.fillTableAddress();
  }

  fillTableAddress():void{
    this.addressService.getAddressAll().subscribe((result: Address[])=>{
      let array = [];
      result.forEach(function(item) {
        array.push({"addressId":item.addressId, "country":item.country, "city":item.city, "street":item.street,"home":item.home,
          "apartment":item.apartment});
      })
      this.dataSource  = new MatTableDataSource<any>(array);
      this.dataSource.paginator = this.paginator;
    },
      ()=>{this.isLauderAddress = false},
      ()=>{this.isLauderAddress = true})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number) : void {
      this.addressService.delete(id).subscribe(() => {
        },
        error => {
          this.notificationService.add('deleteError', id);
          setTimeout(()=>{this.notificationService.remove('deleteError')}, 2000);
        },
        () => {
          this.fillTableAddress();
          this.notificationService.add('deleteOk', id);
          setTimeout(()=>{this.notificationService.remove('deleteOk')}, 2000);
        });
  }

  addAddress(): void {
    if (
      this.address.country != null && this.address.country != '' &&
      this.address.city != null && this.address.city != '' &&
      this.address.street != null && this.address.street != '' &&
      this.address.home != null && this.address.home !='' &&
      this.address.apartment != null && this.address.apartment !=''
    ){
      this.addressService.create(this.address).subscribe(()=>{},
        error => {
          this.notificationService.add('createError');
          setTimeout(()=>{this.notificationService.remove('createError')}, 2000);
          },
        ()=>{
          this.fillTableAddress();
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
