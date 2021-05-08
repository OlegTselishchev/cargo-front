import { Component, OnInit } from '@angular/core';
import { Order } from "../model/order.model";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { OrderService} from "../services/order.service";
import {environment} from "../../environments/environment";
import * as mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";

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
              private authService: AuthService) { }


  public map: mapboxgl.Map;
  public orderDet: Order;
  public idOrder: number;


  ngOnInit(): void {
    this.idOrder = parseInt (this.route.snapshot.paramMap.get('id'))
    this.getOrderDetails();
    (mapboxgl as any).accessToken = environment.mapboxKey;
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
      controls: {inputs: true, instructions: true, interactive: false, profileSwitcher: false}
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
}
