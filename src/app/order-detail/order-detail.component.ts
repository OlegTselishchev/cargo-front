import { Component, OnInit } from '@angular/core';
import { Order } from "../model/order.model";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { OrderService} from "../services/order.service";
import {environment} from "../../environments/environment";
import * as mapboxgl from 'mapbox-gl';
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";
import {Status} from "../model/status.model";
import {Client} from "../model/client.model";
import {ClientService} from "../services/client.service";
import {StatusService} from "../services/status.service";

declare const MapboxDirections: any;


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(public route: ActivatedRoute,
              public location: Location,
              public notificationService: NotificationService,
              public orderService: OrderService,
              public statusService: StatusService,
              public clientService: ClientService,
              private authService: AuthService) { }


  public map: mapboxgl.Map;
  public orderDet: Order;
  public idOrder: number;
  public statusList: Status[] = [];
  public driver: Client = new Client();
  public driverEmail: string = this.authService.getAuthEmail();





  ngOnInit(): void {
    this.idOrder = parseInt (this.route.snapshot.paramMap.get('id'))
    this.getOrderDetails();
    this.showClientByEmail();
    this.showStatusAll();
    (mapboxgl as any).accessToken = environment.mapboxKey;
  }

  showClientByEmail():void{
    this.clientService.getClientByEmail(this.driverEmail).subscribe((data: Client)=>{this.driver = data},
        error => {
          this.notificationService.add('getError');
          setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
        },
        ()=>{
          console.log('getClientByEmail-ok')})
  }

  getOrderDetails(): void {
    this.orderService.showOrderById(this.idOrder).subscribe(data => {
      this.orderDet = data;
          this.createMap();
          this.createDirectional();
    },error => {
          this.notificationService.add('getError');
          setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
        },
        (result = 'complete')=>{

          this.notificationService.add('getOk');
          setTimeout(()=>{this.notificationService.remove('getOk')}, 2000);
        });
  }

  public createDirectional() {

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      interactive: false,
      controls: {inputs: false, instructions: false}
    });

    this.map.addControl(directions, 'top-left');

    this.map.on('load', () => {
            directions.setOrigin([this.orderDet.location.lng, this.orderDet.location.lat]); // can be address in form setOrigin("12, Elm Street, NY")
            directions.setDestination([this.orderDet.destination.lng, this.orderDet.destination.lat]); // can be address
    })
  }

  public createMap(){
    this.map = new mapboxgl.Map({
      container: 'map-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.orderDet.location.lng, this.orderDet.location.lat], // starting position
      zoom: 11
    });
  }

  public get isLoggedAndDriver(): boolean{
    if(this.authService.isAuthenticated() && this.authService.isDriver()){
      return true;
    }else return false;
  }

  public modifyByIdStatusInWork(): void {

    if((this.driver.car.volume >= this.orderDet.box.volume && this.driver.car.liftingCapacity >= this.orderDet.box.weight) ||
        (this.driver.car.trailer?.volume >= this.orderDet.box.volume &&
            this.driver.car.trailer?.liftingCapacity >= this.orderDet.box.weight)) {

      let status: Status = this.statusList.find(x => x.name == 'in_work');
      this.orderDet.driver = this.driver;
      this.orderDet.status = status;

      if (this.orderDet.id != null) {
        if (this.orderDet.driver.userId != null && this.orderDet.status != null) {

          this.orderService.modify(this.orderDet).subscribe(() => {
              },
              error => {
                this.notificationService.add('modifyError', this.orderDet.id);
                setTimeout(() => {
                  this.notificationService.remove('modifyError')
                }, 2000);
              },
              () => {
                this.notificationService.add('modifyOk', this.orderDet.id);
                setTimeout(() => {
                  this.notificationService.remove('modifyOk')
                }, 2000);
              });
        } else {
          this.notificationService.add('dataError');
          setTimeout(() => {
            this.notificationService.remove('dataError')
          }, 2000);
        }
      } else {
        this.notificationService.add('dataError');
        setTimeout(() => {
          this.notificationService.remove('dataError')
        }, 2000);
      }
    } else {this.notificationService.add('takeBoxError');
      setTimeout(()=>{
        this.notificationService.remove('takeBoxError')
      }, 2000);
    }
  }

  showStatusAll(): void{
    this.statusService.getStatus().subscribe((data: Status[])=> {this.statusList = data},
        error => {
          this.notificationService.add('getError');
          setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
        },
        ()=>{
          console.log('getStatus-ok')});
  }
}
