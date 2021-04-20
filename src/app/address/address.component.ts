import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AddressService} from "../services/address.service";
import {Address} from "../model/address.model";
import {Location} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import { MatTableFilter } from 'mat-table-filter';
import {MatTableDataSource} from "@angular/material/table";

export class Captain {
  name: string;
  surname: string;
}

export class SpaceCraft {
  name: string;
  isConstitutionClass: boolean;
  captain: Captain;
}


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

  constructor(public addressService: AddressService, public location: Location) { }

  ngOnInit(): void {
   this.getAddressAll();

    this.addressService.getAddressAll().subscribe((result: Address[])=>{
      let array = [];
      result.forEach(function(item) {
        console.log(item.country + "111");
        array.push({"country":item.country, "city":item.city, "street":item.street,"home":item.home,
          "apartment":item.apartment});
        // ,"destination":item.destination,
        //     "location":item.location, "box":item.box, "receiver":item.receiver, "status":item.status,"driver":item.driver
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
