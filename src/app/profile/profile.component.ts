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


  ngOnInit(): void {
    this.showClient();
    this.showOrders()
  }


  addCar (profile: Client){
    const ref = this.modalService.open(AddCarModel);
    ref.componentInstance.profile = profile;
  };

  edit (profile: Client){
    const ref = this.modalService.open(EditProfileComponent);
    ref.componentInstance.profile = profile;
    ref.result.then((yes) => {
            this.showClient();
        console.log("OK Click");
    },
      (cancel) =>{
      console.log("Cancel Click")
      })
  }

  @Input()
  public modelOrder: Order;

  profile: Client = new Client();
  car: Car;

  public currentId: number = parseInt (this.authService.getClientId());

  showClient(): void {
    this.clientService
      .showById(this.currentId)
      .subscribe(data => {
        this.profile = data;
      }, error => {
        console.log("error get profile");
      });
    // this.car = this.profile.car;
  }

  showOrders(): void {
    // this.orderService.showOrderById(this.currentId);
  }

  public deleteById(id: number): void {
    this.orderService.delete(id);
  }

  public  deleteCar(): void{
    this.carService.delete(this.profile.car.id);
    window.location.reload();
  }
}
