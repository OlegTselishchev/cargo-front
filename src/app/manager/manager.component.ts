import {Component, OnInit, ViewChild} from '@angular/core';
import { OrderService} from "../services/order.service";
import {AuthService} from "../services/auth.service";
import {Status} from "../model/status.model";
import {Order} from "../model/order.model";
import {StatusService} from "../services/status.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {NotificationService} from "../services/notification.service";


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'location', 'destination', 'weight', 'volume', 'price', 'del/close'];
  dataSource: any;

  public pageSize = 1;

  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  constructor(public orderService: OrderService,
              public authService: AuthService,
              public statusService: StatusService,
              public notificationService: NotificationService) { }

  public statusList: Status[] = [];
  public orderListByBoxClientIdAndStatusNotClose: Order[] = [];
  STATUS_CLOSE:string = 'close';
  isLauderOrder: boolean = false;
  isLauderStatus: boolean = false;


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
          "location":item.location.city,
          "destination":item.destination.city,
          "weight":item.box.weight,
          "volume":item.box.volume.toFixed(4),
          "price":item.price,
          "del/close":item.status})
      })
      this.dataSource  = new MatTableDataSource<any>(array);
      this.dataSource.paginator = this.paginator;
    },
        ()=>{this.isLauderOrder = false},
        ()=>{this.isLauderOrder = true});
  }

  getStatus(): void{
    this.statusService.getStatus().subscribe((data:Status[])=>{this.statusList = data},
      error => {
        this.isLauderStatus = false;
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{
      this.isLauderStatus = true;
      console.log('getStatus-ok')});
  }

  public deleteById(id: number): void {
    this.orderService.delete(id).subscribe(()=>{},
      error => {
        this.notificationService.add('deleteError', id);
        setTimeout(()=>{this.notificationService.remove('deleteError')}, 2000);
      },
      ()=>{
        //this.showAllOrderByBoxClientIdAndNotStatus();
        this.fillTableOrder();
        this.notificationService.add('deleteOk', id);
        setTimeout(()=>{this.notificationService.remove('deleteOk')}, 2000);
    });
  }

  public closeById(id: number): void {

    let status: Status = this.statusList.find(x => x.name == 'close');

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
    if(id != null){
      if(order.status != null){
        this.orderService.modify(order).subscribe(()=>{},
          error => {
            this.notificationService.add('modifyError', id);
            setTimeout(()=>{this.notificationService.remove('modifyError')}, 2000);
          },
          ()=>{
            this.fillTableOrder();
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

}
