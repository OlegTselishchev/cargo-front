import {Component, OnInit, ViewChild} from '@angular/core';
import { OrderService} from "../services/order.service";
import {Client} from "../model/client.model";
import {Order} from "../model/order.model";
import {Status} from "../model/status.model";
import {ClientService} from "../services/client.service";
import {AuthService} from "../services/auth.service";
import {StatusService} from "../services/status.service";
import {NotificationService} from "../services/notification.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {KeyService} from "../services/key.service";
import {AddKeyComponent} from "../add-key/add-key.component";


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  displayedColumnsFullOrders: string[] = ['name', 'status','price','loc','dest','volume', 'weight', 'take', 'detail'];
  dataSourceFullOrders: any;

  displayedColumnsMyOrders: string[] = ['name', 'status','price','loc','dest','volume', 'weight', 'impl', 'back', 'detail'];
  dataSourceMyOrders: any;

  displayedColumnsCloseOrders: string[] = ['name', 'status','price','loc','dest','volume', 'weight', 'detail'];
  dataSourceCloseOrders: any;

  public pageSize = 1;

  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  constructor(public orderService: OrderService,
              public dialog: MatDialog,
              public clientService: ClientService,
              private authService: AuthService,
              public statusService: StatusService,
              public keyService: KeyService,
              public notificationService: NotificationService) { }

  public statusList: Status[] = [];
  public driver: Client = new Client();
  public driverEmail: string = this.authService.getAuthEmail();
  public isOrderFull: boolean = true;
  public STATUS_OPEN: string = 'open';
  public STATUS_IN_WORK: string = 'in_work';
  public STATUS_CLOSE: string = 'close';
  public isLoaderOrderStatusOpen: boolean = false;
  public isLoaderOrderStatusImplement: boolean = false;
  public isLoaderOrderStatusClose: boolean = false;
  public isLouderStatus: boolean = false;
  public isLoaderDriver: boolean = false;
  public isOrderClose: boolean = false;


  ngOnInit(): void {
    this.showStatusAll();
    this.showClientByEmail();
    this.fillTableOrderByStatusOpen();
    this.fillTableOrderByDriverIdAndStatusInWork();
    this.fillTableOrderClose();
  }

  fillTableOrderByStatusOpen():void{
    this.orderService.getOrderListByStatus(this.STATUS_OPEN).subscribe((result: Order[])=>{
        let array = [];
        result.forEach(function(item) {
          array.push({
            "id":item.id,
            "name":item.name,
            "status":item.status.name,
            "price":item.price,
            "loc":item.location.city,
            "dest":item.destination.city,
            "volume":item.box.volume.toFixed(4),
            "weight":item.box.weight
          });
        })
        this.dataSourceFullOrders  = new MatTableDataSource<any>(array);
        this.dataSourceFullOrders.paginator = this.paginator;
      },()=>{this.isLoaderOrderStatusOpen = false},
      ()=>{this.isLoaderOrderStatusOpen = true});
  }

  fillTableOrderByDriverIdAndStatusInWork():void{
    this.orderService.getOrderListByDriverIdAndStatus(this.authService.getClientId(), this.STATUS_IN_WORK)
      .subscribe((result: Order[])=>{
          let array = [];
          result.forEach(function(item) {
            array.push({
              "id":item.id,
              "name":item.name,
              "status":item.status.name,
              "price":item.price,
              "loc":item.location.city,
              "dest":item.destination.city,
              "volume":item.box.volume.toFixed(4),
              "weight":item.box.weight
            });
          })
          this.dataSourceMyOrders  = new MatTableDataSource<any>(array);
          this.dataSourceMyOrders.paginator = this.paginator;
        },()=>{this.isLoaderOrderStatusImplement = false},
        ()=>{this.isLoaderOrderStatusImplement = true});
  }


  fillTableOrderClose():void{
    this.orderService.getOrderListByDriverIdAndStatus(this.authService.getClientId(), this.STATUS_CLOSE)
      .subscribe((result: Order[])=>{
          let array = [];
          result.forEach(function(item) {
            array.push({
              "id":item.id,
              "name":item.name,
              "status":item.status.name,
              "price":item.price,
              "loc":item.location.city,
              "dest":item.destination.city,
              "volume":item.box.volume.toFixed(4),
              "weight":item.box.weight
            });
          })
          this.dataSourceCloseOrders  = new MatTableDataSource<any>(array);
          this.dataSourceCloseOrders.paginator = this.paginator;
        },()=>{this.isLoaderOrderStatusClose = false},
        ()=>{this.isLoaderOrderStatusClose = true});
  }

  applyFilterFullOrders(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFullOrders.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFullOrders.paginator) {
      this.dataSourceFullOrders.paginator.firstPage();
    }
  }

  applyFilterMyOrders(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMyOrders.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMyOrders.paginator) {
      this.dataSourceMyOrders.paginator.firstPage();
    }
  }

  applyFilterCloseOrders(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCloseOrders.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCloseOrders.paginator) {
      this.dataSourceCloseOrders.paginator.firstPage();
    }
  }

  showClientByEmail():void{
    this.clientService.getClientByEmail(this.driverEmail).subscribe((data: Client)=>{this.driver = data},
      error => {
        this.isLoaderDriver = false;
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{
        this.isLoaderDriver = true;
        console.log('getClientByEmail-ok')})
  }

  showStatusAll(): void{
    this.statusService.getStatus().subscribe((data: Status[])=> {this.statusList = data},
      error => {
        this.isLouderStatus = false;
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{
        this.isLouderStatus = true;
        console.log('getStatus-ok')});
  }


  public modifyByIdStatusInWork(id: number, weight: number, volume: number): void {

    let carVolume = this.driver.car.volume;
    let carLiftingCapacity= this.driver.car.liftingCapacity;
    let trailerLiftingCapacity = 0;
    let trailerVolume = 0;

    if(this.driver.car.trailer != null){
      trailerLiftingCapacity = this.driver.car.trailer.liftingCapacity;
      trailerVolume = this.driver.car.trailer.volume;
    }

    if((carVolume >= volume && carLiftingCapacity >= weight) ||
      (trailerVolume >= volume && trailerLiftingCapacity >= weight)) {

      let status: Status = this.statusList.find(x => x.name == 'in_work');

      const order: Order = {
        id: id,
        name: null,
        destination: null,
        location: null,
        box: null,
        price: null,
        receiver: null,
        status: status,
        driver: this.driver
      };
      if (id != null) {
        if (order.driver.userId != null && order.status != null) {

          this.orderService.modify(order).subscribe(() => {
            },
            error => {
              this.notificationService.add('modifyError', id);
              setTimeout(() => {
                this.notificationService.remove('modifyError')
              }, 2000);
            },
            () => {
              this.fillTableOrderByStatusOpen();
              this.notificationService.add('modifyOk', id);
              setTimeout(() => {
                this.notificationService.remove('modifyOk')
              }, 2000);
            });
        } else {
          this.notificationService.add('dataError');
          setTimeout(() => {
            this.notificationService.remove('dataError')
          }, 2000);
        }
      } else {
        this.notificationService.add('dataError');
        setTimeout(() => {
          this.notificationService.remove('dataError')
        }, 2000);
      }
    } else {this.notificationService.add('takeBoxError');
      setTimeout(()=>{
        this.notificationService.remove('takeBoxError')
      }, 2000);
    }
  }

  public modifyByIdStatusImplemented(id: number): void {

    let key: string = this.keyService.key;
    let keyForCheck: string = '0000';

    if(key == keyForCheck) {
      this.keyService.key = '';
      let status: Status = this.statusList.find(x => x.name == 'implemented');

      const order: Order = {
        id: id,
        name: null,
        destination: null,
        location: null,
        box: null,
        price: null,
        receiver: null,
        status: status,
        driver: this.driver
      };
      if (id != null) {
        if (order.driver.userId != null && order.status != null) {
          this.orderService.modify(order).subscribe(()=>{},
            error => {
              this.notificationService.add('modifyError', id);
              setTimeout(()=>{this.notificationService.remove('modifyError')}, 2000);
            },
            ()=>{
              this.fillTableOrderByDriverIdAndStatusInWork()
              this.notificationService.add('modifyOk', id);
              setTimeout(()=>{this.notificationService.remove('modifyOk')}, 2000);
            });
        } else {
          this.notificationService.add('dataError');
          setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
        }
      } else {
        this.notificationService.add('dataError');
        setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
      }
    }else {
      this.notificationService.add('keyError');
      setTimeout(()=>{this.notificationService.remove('keyError')}, 2000);
    }
  }


  public modifyStatusOpen(id: number): void {

    let status: Status = this.statusList.find(x => x.name == 'open');

    const order: Order = {
      id: id,
      name: null,
      destination: null,
      location: null,
      box: null,
      price: null,
      receiver: null,
      status: status,
      driver: null
    };
    if(id != null && order.status != null){
      this.orderService.modify(order).subscribe(()=>{},
        error => {
          this.notificationService.add('modifyError', id);
          setTimeout(()=>{this.notificationService.remove('modifyError')}, 2000);
        },
        ()=>{
          this.fillTableOrderByDriverIdAndStatusInWork();
          this.notificationService.add('modifyOk', id);
          setTimeout(()=>{this.notificationService.remove('modifyOk')}, 2000);
        });
    }else {
      this.notificationService.add('dataError');
      setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
    }
  }

  add(id: number, ln: string, fn: string, mn: string): void {
    this.driver.userId = id;
    this.driver.lastName = ln;
    this.driver.firstName = fn;
    this.driver.middleName = mn;
  }

  myOrder(): void {
    this.isOrderFull = false;
    this.isOrderClose = false;
    this.fillTableOrderByDriverIdAndStatusInWork();
  }

  fullOrders():void {
    this.isOrderFull = true;
    this.isOrderClose = false;
    this.fillTableOrderByStatusOpen();
  }

  history(): void {
    this.isOrderClose = true;
    this.fillTableOrderClose();
  }

  checkKey(id: number):void{
    const addKey = this.dialog.open(AddKeyComponent);
    addKey.afterClosed().subscribe(result => {
        this.modifyByIdStatusImplemented(id);
    });
  }

}
