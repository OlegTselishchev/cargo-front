import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from "../services/client.service";
import {Client} from "../model/client.model";
import {OrderService} from "../services/order.service";
import {Order} from "../model/order.model";
import {Car} from "../model/car.model";
import {CarService} from "../services/car.service";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {AddCarModel} from "../add-car-model/add-car-model";
import {AuthService} from "../services/auth.service";
import {MatDialog} from '@angular/material/dialog';
import {AddTrailerComponent} from "../add-trailer/add-trailer.component";
import {TrailerService} from "../services/trailer.service";
import {NotificationService} from "../services/notification.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Status} from "../model/status.model";
import {StatusService} from "../services/status.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  constructor(public clientService: ClientService,
              public orderService: OrderService,
              public notificationService: NotificationService,
              public dialog: MatDialog,
              private statusService: StatusService,
              public carService: CarService,
              public trailerService: TrailerService,
              private authService: AuthService) {

  }
  public currentId: number = parseInt (this.authService.getClientId());
  profile: Client = new Client();
  car: Car;
  orderList: Order [] = [];
  displayedColumns: string[] = ['id', 'name', 'status', 'location', 'destination', 'weight', 'volume', 'price'];
  dataSource: any;
  STATUS_CLOSE:string = 'close';
  isLoaderOrder: boolean = false;
  isLoaderStatus: boolean = false;
  public pageSize = 7;
  public statusList: Status[] = [];
  orderListByDriverId: Order[] = [];
  STATUS_IN_WORK: string = 'in_work';

  ngOnInit(): void {
    this.fillTableOrder();
    this.showClient();
  }

  addTrailer (){
    const addTrailerRef = this.dialog.open(AddTrailerComponent,
      {data: {profile: this.profile}
      })
    addTrailerRef.afterClosed().subscribe(result => {
      if (result === "Yes" ) {
        this.showClient();
      } else if  (result === "error") {
        this.notificationService.add('errorUpdate');
        setTimeout(()=>{this.notificationService.remove('equalsPassword')}, 2000);
      }
    });
  };

  addCar (){
    const addCarRef = this.dialog.open(AddCarModel,
      {data: {profile: this.profile}
      })
    addCarRef.afterClosed().subscribe(result => {
      if (result == "Yes" ) {
        this.showClient();
      } else if (result === "error") {
        this.notificationService.add('errorUpdate');
        setTimeout(()=>{this.notificationService.remove('equalsPassword')}, 2000);
      }
    });
  };

  edit (){
    const editRef = this.dialog.open(EditProfileComponent,
      {data: {profile: this.profile}
      })
    editRef.afterClosed().subscribe(result  => {
      if (result == "Yes" ) {
        this.showClient();
      } else if (result === "error") {
        this.notificationService.add('errorUpdate');
        setTimeout(()=>{this.notificationService.remove('errorUpdate')}, 2000);
      }
    });
  }

  showClient(): void {
    this.clientService
      .showById(this.currentId)
      .subscribe(data => {
        this.profile = data;
      }, error => {
        console.log("error get profile");
      });
  }

  public  deleteCar(): void{
    this.carService.delete(this.profile.car.id)
        .subscribe(() => {
          }, error => {
            this.notificationService.add('deleteError', this.profile.car.id);
            setTimeout(() => {
              this.notificationService.remove('deleteError')
            }, 2000);
          },
          () => {
            this.authService.setIsDriver('false');
            this.notificationService.add('deleteOk', this.profile.car.id);
            setTimeout(() => {
              this.notificationService.remove('deleteOk')
            }, 2000);
            this.showClient();
          });
  }

  public  deleteTrailer(): void{
    this.trailerService.delete(this.profile.car.trailer.id)
        .subscribe( ()=> {
          this.notificationService.add('successfulUpdate');
          setTimeout(()=>{this.notificationService.remove('successfulUpdate')}, 2000);
          this.showClient()
        },error => {alert('error')});
  }

  fillTableOrder(){
    this.orderService.getOrderListByBoxClientIdAndStatus(this.authService.getClientId(), this.STATUS_CLOSE)
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
                  "price":item.price})
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

  public checkPossibilityOfDelete(): void{
    this.orderService.getOrderListByDriverIdAndStatus(this.authService.getClientId(), this.STATUS_IN_WORK)
      .subscribe((data:Order[])=>{this.orderListByDriverId = data;},
        ()=>{this.notificationService.add('getError');
                setTimeout(()=>{this.notificationService.remove('getError')}, 2000);},
      ()=>{
      if(this.orderListByDriverId[0] == null){
        this.deleteCar();
      }else {this.notificationService.add('deleteCarError');
        setTimeout(()=>{this.notificationService.remove('deleteCarError')}, 2000);
      }
      });
  }
}

export interface DialogData {
  profile: Client;
}
