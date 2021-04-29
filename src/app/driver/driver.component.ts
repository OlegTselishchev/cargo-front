import {Component, OnInit, ViewChild} from '@angular/core';
import { OrderService} from "../services/order.service";
import {Client} from "../model/client.model";
import {Order} from "../model/order.model";
import {Status} from "../model/status.model";
import {ClientService} from "../services/client.service";
import {AuthService} from "../services/auth.service";
import {StatusService} from "../services/status.service";
import {NotificationService} from "../services/notification.service";
import {Box} from "../model/box.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'status','price','loc','dest','volume', 'weight', 'take'];
  dataSource: any;

  displayedColumns1: string[] = ['id', 'name', 'status','price','loc','dest','volume', 'weight', 'impl', 'back'];
  dataSource1: any;

  public pageSize = 1;

  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  constructor(public orderService: OrderService,
              public clientService: ClientService,
              private authService: AuthService,
              public statusService: StatusService,
              public notificationService: NotificationService) { }

  public statusList: Status[] = [];
  public orderList: Order[] = [];
  public driver: Client = new Client();
  public driverEmail: string = this.authService.getAuthEmail();
  public isOrderFull: boolean = true;
  public STATUS_OPEN: string = 'open';
  public STATUS_IN_WORK: string = 'in_work';
  public isLauderOrderStatusOpen: boolean = false;
  public isLauderOrderStatusImplement: boolean = false;
  public isLouderStatus: boolean = false;
  public isLauderDriver: boolean = false;

  ngOnInit(): void {
    this.showStatusAll();
    this.showClientByEmail();
    this.fillTableOrderByStatusOpen();
    this.fillTableOrderByDriverIdAndStatusInWork();
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
        this.dataSource  = new MatTableDataSource<any>(array);
        this.dataSource.paginator = this.paginator;
      },()=>{this.isLauderOrderStatusOpen = false},
      ()=>{this.isLauderOrderStatusOpen = true});
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
        this.dataSource1  = new MatTableDataSource<any>(array);
        this.dataSource1.paginator = this.paginator;
      },()=>{this.isLauderOrderStatusImplement = false},
        ()=>{this.isLauderOrderStatusImplement = true});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  showClientByEmail():void{
    this.clientService.getClientByEmail(this.driverEmail).subscribe((data: Client)=>{this.driver = data},
      error => {
      this.isLauderDriver = false;
      this.notificationService.add('getError');
      setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{
      this.isLauderDriver = true;
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

    let key1 = prompt('Введи ключ');
    let key2: string = '0000';

    if(key1 == key2) {

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

  myOrder(): void {
    this.isOrderFull = false;
    this.fillTableOrderByDriverIdAndStatusInWork();
  }

  fullOrders():void {
    this.isOrderFull = true;
    this.fillTableOrderByStatusOpen();
  }

}
