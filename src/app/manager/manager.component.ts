import {Component, OnInit, ViewChild} from '@angular/core';
import { OrderService} from "../services/order.service";
import {AuthService} from "../services/auth.service";
import {Status} from "../model/status.model";
import {Order} from "../model/order.model";
import {StatusService} from "../services/status.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price'];
// , 'destination','location','box','receiver','status','driver'
 // dataSource = new MatTableDataSource();

  dataSource: any;

  public pageSize = 1;

  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  constructor(public orderService: OrderService,
              private authService: AuthService,
              private statusService: StatusService) { }

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

  }

  showAllOrder(): void {
    this.orderService.getOrderList().subscribe((data:Order[])=>{this.orderList = data});
  }

  public deleteById(id: number): void {
    this.orderService.delete(id).subscribe(()=>{},
      error => {alert('error order delete')},
      ()=>{this.showAllOrder()});
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
          error => {alert('error order modify')},
          ()=>{this.showAllOrder()});
      }else {alert('not driver or status')}
    }else {alert('not id order for modify')}

  }

}
