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
import {ACCESS_USER_ID, AuthService} from "../services/auth.service";

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

  showClient(): void {
    this.clientService
      .showById(this.currentId)
      .subscribe(data => {
        this.profile = data;
      }, error => {
        console.log("error get profile");
      });
  }



  addCar (profile: Client){
    const editRef = this.modalService.open(AddCarModel);
    // editRef.componentInstance.profile = profile;
    editRef.result.then((yes) => {
        console.log("11111");
        this.showClient();
        console.log("222222");
        console.log("OK Click");
        window.location.reload();

      },
      (cancel) =>{
        console.log("Cancel Click")
      })
  };

  edit (profile: Client){
    const addCarRef = this.modalService.open(EditProfileComponent);
    addCarRef.componentInstance.profile = profile;
    addCarRef.result.then((yes) => {
        console.log("11111");
        this.showClient();
        console.log("222222");
        console.log("OK Click");
      },
      (cancel) =>{
      console.log("Cancel Click")
      })
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
      .subscribe( ()=>{},error => {alert('error')});
    window.location.reload();
    // this.showClient()
  }
}
