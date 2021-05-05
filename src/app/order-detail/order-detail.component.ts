import { Component, OnInit } from '@angular/core';
import { Order } from "../model/order.model";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { OrderService} from "../services/order.service";
import {environment} from "../../environments/environment";
import * as mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(public route: ActivatedRoute,
              public location: Location,
              public orderService: OrderService) { }


  public map: mapboxgl.Map;
  public orderDet: Order;
  public idOrder: number;

  ngOnInit(): void {
    this.idOrder = parseInt (this.route.snapshot.paramMap.get('id'))
    this.getOrderDetails();

    (mapboxgl as any).accessToken = environment.mapboxKey;

    this.createMap()
    this.createDirectional()

  }

  getOrderDetails(): void {
    this.orderService.showOrderById(this.idOrder).subscribe(data => {
      this.orderDet = data;
    }, error => {
      console.log("error get profile");
    });
  }

  goBack(): void {
    this.location.back();
  }



  createDirectional() {
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      controls: {inputs: false, instructions: false}
    });


    this.map.addControl(directions, 'top-left');

    this.map.on('load', function () {
      directions.setOrigin([49.33539479859789, 53.53522587333123]); // can be address in form setOrigin("12, Elm Street, NY")
      directions.setDestination([49.3031469, 53.5116653]); // can be address
    })
  }

  public createMap(){
    this.map = new mapboxgl.Map({
      container: 'map-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [49.3859888, 53.5431899], // starting position
      zoom: 11
    });
  }

}
