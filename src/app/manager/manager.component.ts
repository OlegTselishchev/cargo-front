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
  displayedColumns: string[] = ['id', 'name', 'price'];
  dataSource: any;

  public pageSize = 1;

  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  constructor(public orderService: OrderService,
              private authService: AuthService,
              private statusService: StatusService,
              public notificationService: NotificationService) { }

  public statusList: Status[] = [];
  public orderList: Order[] = [];

  searchOrderName: string = '';
  searchOrderPrice: string = '';
  searchOrderWeight: string = '';
  searchOrderLocCity: string = '';
  searchOrderDestCity: string = '';
  searchOrderByBoxClientEmail: string = this.authService.getAuthEmail();

  ngOnInit(): void {
    // this.showAllOrder();
    this.statusService.getStatus().subscribe((data:Status[])=>{this.statusList = data});

    this.orderService.getOrderList().subscribe((result: Order[])=>{
      let array = [];
      result.forEach(function(item) {
        console.log(item.name + "111");
        array.push({"id":item.id, "name":item.name, "price":item.price});
      // ,"destination":item.destination,
      //     "location":item.location, "box":item.box, "receiver":item.receiver, "status":item.status,"driver":item.driver
      })
      this.dataSource  = new MatTableDataSource<any>(array);
      this.dataSource.paginator = this.paginator;
    })

    this.showAllOrder();
    this.getStatus();
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

  getStatus(): void{
    this.statusService.getStatus().subscribe((data:Status[])=>{this.statusList = data},
      error => {
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{console.log('getStatus-ok')});
  }

  public deleteById(id: number): void {
    this.orderService.delete(id).subscribe(()=>{},
      error => {
        this.notificationService.add('deleteError', id);
        setTimeout(()=>{this.notificationService.remove('deleteError')}, 2000);
      },
      ()=>{this.showAllOrder();
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

}
