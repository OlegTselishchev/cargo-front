import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import * as mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import {OrderService} from "../services/order.service";
import {NotificationService} from "../services/notification.service";
import {Router} from "@angular/router";
import {Order} from "../model/order.model";


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  constructor(public orderService: OrderService,
              public notificationService: NotificationService,
              public router: Router) {
  }

  order: Order = new Order();
  public map: mapboxgl.Map;


  ngOnInit(): void {

    // this.showOrder(100);


    (mapboxgl as any).accessToken = environment.mapboxKey;

    this.map = new mapboxgl.Map({
      container: 'map-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [49.3859888, 53.5431899], // starting position
      zoom: 11
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      controls: {inputs: false, instructions: false}
    });

    this.map.addControl(directions,'top-left');

    this.map.on('load',  function() {
      directions.setOrigin([49.33539479859789 , 53.53522587333123]); // can be address in form setOrigin("12, Elm Street, NY")
      directions.setDestination([49.3031469 , 53.5116653]); // can be address
    })

    const marker = new mapboxgl.Marker({
      draggable: false
    })
        .setLngLat([49.28035, 53.515266])
        .addTo(this.map);
  }
}



