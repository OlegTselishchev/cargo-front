import {Component,OnInit, ViewChild} from '@angular/core';
import {AddressService} from "../services/address.service";
import {Address} from "../model/address.model";
import {Location} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

import {NotificationService} from "../services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateAddressComponent} from "../create-address/create-address.component";

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

  constructor(public addressService: AddressService,
              public location: Location,
              public notificationService: NotificationService,
              public dialog: MatDialog) { }

  public isLoaderAddress: boolean = false;

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
      ()=>{
      this.isLoaderAddress = false;
      this.notificationService.add('getError');
      setTimeout(()=>{this.notificationService.remove('getError')}, 2000)},
      ()=>{
      this.isLoaderAddress = true;
      this.notificationService.add('getOk');
      setTimeout(()=>{this.notificationService.remove('getOk')}, 2000)})
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

  createAddress():void{
    const addAddress = this.dialog.open(CreateAddressComponent)
    addAddress.afterClosed().subscribe(result => {
      if (result === "Yes") {
        this.fillTableAddress();
      } else if (result === "error") {
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
