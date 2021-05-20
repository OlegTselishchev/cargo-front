import {Component, OnInit, ViewChild} from '@angular/core';
import { OrderService} from "../services/order.service";
import {AuthService} from "../services/auth.service";
import {Status} from "../model/status.model";
import {Order} from "../model/order.model";
import {StatusService} from "../services/status.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {NotificationService} from "../services/notification.service";
import {Client} from "../model/client.model";


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  displayedColumns: string[] = ['name', 'location', 'destination', 'weight', 'volume', 'price', 'action','detail'];
  dataSource: any;

  public pageSize = 7;

  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  constructor(public orderService: OrderService,
              private authService: AuthService,
              private statusService: StatusService,
              public notificationService: NotificationService) { }

  public statusList: Status[] = [];
  public orderListByBoxClientIdAndStatusNotClose: Order[] = [];
  STATUS_CLOSE:string = 'close';
  isLoaderOrder: boolean = false;
  isLoaderStatus: boolean = false;

  ngOnInit(): void {
    this.fillTableOrder();
    this.getStatus();
  }

  fillTableOrder(){
    this.orderService.getOrderListByBoxClientIdAndNotStatus(this.authService.getClientId(), this.STATUS_CLOSE)
      .subscribe((result: Order[])=>{
          let array = [];
          result.forEach(function(item) {
            array.push({
              "id":item.id,
              "name":item.name,
              "status": item.status,
              "location":item.location.city +', '+ item.location.street,
              "destination":item.destination.city +', '+ item.destination.street,
              "weight":item.box.weight,
              "volume":item.box.volume.toFixed(4),
              "price":item.price,
              "action":item.status})
          })
          this.dataSource  = new MatTableDataSource<any>(array);
          this.dataSource.paginator = this.paginator;
        },
        ()=>{this.isLoaderOrder = false},
        ()=>{this.isLoaderOrder = true});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatus(): void{
    this.statusService.getStatus().subscribe((data:Status[])=>{this.statusList = data},
      error => {
      this.isLoaderStatus = false;
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{
      this.isLoaderStatus = true;
      console.log('getStatus-ok')});
  }

  public deleteById(id: number): void {
    this.orderService.delete(id).subscribe(()=>{},
      error => {
        this.notificationService.add('deleteError', id);
        setTimeout(()=>{this.notificationService.remove('deleteError')}, 2000);
      },
      ()=>{
      this.fillTableOrder()
        this.notificationService.add('deleteOk', id);
        setTimeout(()=>{this.notificationService.remove('deleteOk')}, 2000);
    });
  }

  public closeById(id: number): void {
    let status: Status = this.statusList.find(x => x.name == 'close');

    let orderForModify: Order = new Order();

    this.orderService.showOrderById(id).subscribe((order: Order)=>{orderForModify = order},
      ()=>{},
      ()=>{

        const order: Order = {
          id: id,
          name: null,
          destination: null,
          location: null,
          box: null,
          price: null,
          receiver: null,
          status: status,
          driver: orderForModify.driver
        };
        if(id != null){
          if(order.status != null){
            this.orderService.modify(order).subscribe(()=>{},
              error => {
                this.notificationService.add('modifyError', id);
                setTimeout(()=>{this.notificationService.remove('modifyError')}, 2000);
              },
              ()=>{
                this.fillTableOrder()
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


      });

  }

  deleteOrderWithStatusInWork(id: number):void{
    this.notificationService.add('deleteError', id);
    setTimeout(()=>{this.notificationService.remove('deleteError')},2000);
  }
}
