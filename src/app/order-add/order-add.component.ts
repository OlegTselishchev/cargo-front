import {Component, OnInit, ViewChild} from '@angular/core';
import {AddressService} from "../services/address.service";
import {ClientService} from "../services/client.service";
import {BoxService} from "../services/box.service";
import {Address} from "../model/address.model";
import {Box} from "../model/box.model";
import {Client} from "../model/client.model";
import {Status} from "../model/status.model";
import {Order} from "../model/order.model";
import {OrderService} from "../services/order.service";
import {Location} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {StatusService} from "../services/status.service";
import {NotificationService} from "../services/notification.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  constructor(public addressService: AddressService,
              public clientService: ClientService,
              public boxService: BoxService,
              public orderService: OrderService,
              public location: Location,
              public authService: AuthService,
              public statusService: StatusService,
              public notificationService: NotificationService) {
  }

  public addressListDest: Address[] = [];
  public addressListLoc: Address[] = [];
  public clientList: Client[] = [];
  public boxList: Box[] = [];
  public statusList: Status[] = [];

  dest: Address = new Address();
  loc: Address = new Address();
  box: Box = new Box();
  receiver: Client = new Client();

  isLocActive: boolean = false;

  searchBoxClientEmail: string = this.authService.getAuthEmail();


  controlDest = new FormControl();
  controlLoc = new FormControl();
  controlReceiver = new FormControl();
  controlBox = new FormControl();

  filteredAddressDest: Observable<Address[]>;
  filteredAddressLoc: Observable<Address[]>;
  filteredReceiver: Observable<Client[]>;
  filteredBox: Observable<Box[]>;

  inputDest: string = '';
  inputLoc: string = '';
  inputRec: string = '';
  inputBox: string= '';

  ngOnInit(): void {
    this.showBox();
    this.showClient();
    this.showAddress();
    this.showStatus();

    this.filteredAddressDest = this.controlDest.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDest(value))
    );

    this.filteredAddressLoc = this.controlLoc.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLoc(value))
    );

    this.filteredReceiver = this.controlReceiver.valueChanges.pipe(
      startWith(''),
      map(value => this._filterRec(value))
    );

    this.filteredBox = this.controlBox.valueChanges.pipe(
      startWith(''),
      map(value => this._filterBox(value))
    );
  }

  private _filterDest(value: string): Address[] {
    const filterValue = this._normalizeValue(value);
    return this.addressListDest.filter(address => this._normalizeValue(address.city).includes(filterValue));
  }

  private _filterLoc(value: string): Address[] {
    const filterValue = this._normalizeValue(value);
    return this.addressListLoc.filter(address => this._normalizeValue(address.city).includes(filterValue));
  }

  private _filterRec(value: string): Client[] {
    const filterValue = this._normalizeValue(value);
    return this.clientList.filter(client => this._normalizeValue(client.lastName).includes(filterValue));
  }

  private _filterBox(value: string): Box[] {
    const filterValue = this._normalizeValue(value);
    return this.boxList.filter(box => this._normalizeValue(box.name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  addDestination(dest: Address): void {
    this.dest = dest;
  }

  clearDest(): void {
    if (this.inputDest == '') {
      this.dest.addressId = null;
    } else {
      return;
    }
  }

  addLocation(loc: Address): void {
    this.loc = loc;
  }

  clearLoc(): void {
    if (this.inputLoc == '') {
      this.loc.addressId = null;
    } else {
      return;
    }
  }

  addReceiver(receiver: Client): void {
    this.receiver = receiver;
  }

  clearReceiver(): void {
    if (this.inputRec == '') {
      this.receiver.userId = null;
    } else {
      return;
    }
  }

  addBox(box: Box): void {
    this.box = box;
  }

  clearBox(): void {
    if (this.inputBox == '') {
      this.box.boxId = null;
    } else {
      return;
    }
  }


  create(): void {
    let status: Status = this.statusList.find(x => x.name == 'open');

    let price = this.box.weight * 500;

    const order: Order = {
      name: 'order',
      destination: this.dest,
      location: this.loc,
      box: this.box,
      price: price,
      receiver: this.receiver,
      status: status,
      driver: null
    };

    if (order.receiver.userId != null && order.box.boxId != null &&
      order.location.addressId != null && order.destination.addressId != null &&
      order.price != null && order.status.id != null
    ) {
      this.orderService.create(order).subscribe(() => {
        },
        error => {
          this.notificationService.add('createError');
          setTimeout(() => {
            this.notificationService.remove('createError')
          }, 2000);
        },
        () => {
          this.notificationService.add('createOk');
          setTimeout(() => {
            this.notificationService.remove('createOk')
          }, 2000);
        });
    } else {
      this.notificationService.add('dataError');
      setTimeout(()=>{
        this.notificationService.remove('dataError')
      }, 2000);
    }
    this.box.boxId = null;
    this.box.name = '';
    this.loc.addressId = null;
    this.loc.city = '';
    this.dest.addressId = null;
    this.dest.city = '';
    this.receiver.userId = null;
    this.receiver.lastName = '';
  }

  goBack(): void {
    this.location.back();
  }

  showBox(): void {
    this.boxService.getBoxAll().subscribe((data: Box[]) => {
      this.boxList = data
    });
  }

  showAddress(): void {
    this.addressService.getAddressAll().subscribe((data: Address[]) => {
      this.addressListDest = data;
      this.addressListLoc = data;
    });
  }

  showClient(): void {
    this.clientService.getClientAllByLastNameNotNull().subscribe((data: Client[]) => {
      this.clientList = data
    });
  }

  showStatus(): void {
    this.statusService.getStatus().subscribe((data: Status[]) => {
      this.statusList = data
    });
  }

}

