import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  constructor(public clientService: ClientService,
              public orderService: OrderService,
              public notificationService: NotificationService,
              public dialog: MatDialog,
              public carService: CarService,
              public trailerService: TrailerService,
              private authService: AuthService) {

  }
  public currentId: number = parseInt (this.authService.getClientId());
  profile: Client = new Client();
  car: Car;
  orderList: Order [] = [];

  ngOnInit(): void {
    this.showClient();
    // this.showOrders()
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

  showOrders(): void {
    this.orderService.showOrderById(this.currentId)
      .subscribe((date: Order[]) => {
        this.orderList = date;
      });
  }

  public deleteById(id: number): void {
    this.orderService.delete(id);
  }

  public  deleteCar(): void{
    this.carService.delete(this.profile.car.id)
      .subscribe( ()=> {
        this.notificationService.add('successfulUpdate');
        setTimeout(()=>{this.notificationService.remove('successfulUpdate')}, 2000);
        this.showClient()
      },error => {alert('error')});
  }

  public  deleteTrailer(): void{
    this.trailerService.delete(this.profile.car.trailer.id)
        .subscribe( ()=> {
          this.notificationService.add('successfulUpdate');
          setTimeout(()=>{this.notificationService.remove('successfulUpdate')}, 2000);
          this.showClient()
        },error => {alert('error')});
  }
}

export interface DialogData {
  profile: Client;
}
