import { Component, OnInit } from '@angular/core';
import { OrderService} from "../services/order.service";
import {Client} from "../model/client.model";
import {Order} from "../model/order.model";
import {Status} from "../model/status.model";
import {ClientService} from "../services/client.service";
import {AuthService} from "../services/auth.service";
import {StatusService} from "../services/status.service";
import {NotificationService} from "../services/notification.service";


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

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

  searchOrderName: string = '';
  searchOrderPrice: string = '';
  searchOrderWeight: string = '';
  searchOrderLocCity: string = '';
  searchOrderDestCity: string = '';


  ngOnInit(): void {
    this.showAllOrder();
    this.showStatusAll();
    this.showClientByEmail();
  }

  showAllOrder(): void {
    this.orderService.getOrderList().subscribe((data:Order[])=>{this.orderList = data},
      error => {
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{
        this.notificationService.add('getOk');
        setTimeout(()=>{this.notificationService.remove('getOk')}, 2000);
      });
  }



  showClientByEmail():void{
    this.clientService.getClientByEmail(this.driverEmail).subscribe((data: Client)=>{this.driver = data},
      error => {
      this.notificationService.add('getError');
      setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{console.log('getClientByEmail-ok')})
  }


  showStatusAll(): void{
    this.statusService.getStatus().subscribe((data: Status[])=> {this.statusList = data},
      error => {
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{console.log('getStatus-ok')});
  }

  public modifyByIdStatusInWork(id: number): void {

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
      if(id != null){
        if(order.driver.userId != null && order.status != null){
          this.orderService.modify(order).subscribe(()=>{},
            error => {
              this.notificationService.add('modifyError', id);
              setTimeout(()=>{this.notificationService.remove('modifyError')}, 2000);
            },
            ()=>{this.showAllOrder();
              this.notificationService.add('modifyOk', id);
              setTimeout(()=>{this.notificationService.remove('modifyOk')}, 2000);
          });
        }else {
          this.notificationService.add('dataError');
          setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
        }
      }else {
        this.notificationService.add('dataError');
        setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
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
            ()=>{this.showAllOrder();
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


  public back(id: number): void {

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
          ()=>{this.showAllOrder();
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
  }

  fullOrders():void {
    this.isOrderFull = true;
  }

}
