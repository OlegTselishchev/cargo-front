import {Component, Input, OnInit} from '@angular/core';
import {ClientService} from "../services/client.service";
import {Client} from "../model/client.model";
import {OrderService} from "../services/order.service";
import {Order} from "../model/order.model";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Car} from "../model/car.model";
import {CarService} from "../services/car.service";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {AddCarModel} from "../add-car-model/add-car-model";
import {AuthService} from "../services/auth.service";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ProfileComponent implements OnInit {

  constructor(public clientService: ClientService,
              public orderService: OrderService,
              config: NgbModalConfig,
              public dialog: MatDialog,
              private modalService: NgbModal,
              public carService: CarService,
              private authService: AuthService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  public currentId: number = parseInt (this.authService.getClientId());
  profile: Client = new Client();
  car: Car;
  orderList: Order [] = [];

  ngOnInit(): void {
    this.showClient();
    this.showOrders()
  }

  addTrailer (){
    const addCarRef = this.dialog.open(AddCarModel,
      {data: {profile: this.profile}
      })
    addCarRef.afterClosed().subscribe(result => {
      if (result == "Yes" ) {
        this.showClient();
      } else if  (result == "cancel") {
        alert('фу лох, даже не поменял ничего')
      } else {
        alert('You have some issues with back. Please, try again');
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
      } else if  (result == "cancel") {
        alert('фу лох, даже не поменял ничего')
      } else {
        alert('You have some issues with back. Please, try again');
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
      }else if (result == "cancel"){
        alert('фу лох, даже не поменял ничего')
      } else {
        alert('You have some issues with back. Please, try again');
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
        this.showClient()
      },error => {alert('error')});

  }
}

export interface DialogData {
  profile: Client;
}
