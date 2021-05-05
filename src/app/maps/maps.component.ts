import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import * as mapboxgl from 'mapbox-gl';
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
  public orderList: Order[] = [];


  ngOnInit(): void {

    this.showAllOrder();

    (mapboxgl as any).accessToken = environment.mapboxKey;

    this.createMap()
  }

  public createMap(){
    this.map = new mapboxgl.Map({
      container: 'map-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [49.3859888, 53.5431899], // starting position
      zoom: 11
    });
  }

  public createMarkers(){
    for (var i = 0; i < this.orderList.length; i++) {

      var html = '<h1>' + this.orderList[i].name +'</h1><br>'+
          '<a target="_blank" href="/orderDetail/' + this.orderList[i].id +'" >details</a>';

      var popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(html);
      const marker = new mapboxgl.Marker({
        draggable: false
      })
          .setLngLat([this.orderList[i].location.lng, this.orderList[i].location.lat])
          .setPopup(popup)
          .addTo(this.map);
    }
  }

  public showAllOrder(): void {
    this.orderService.getOrderList().subscribe((data:Order[])=>{this.orderList = data},
        error => {
          this.notificationService.add('getError');
          setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
        },
        (result = 'complete')=>{
          this.createMarkers();
          this.notificationService.add('getOk');
          setTimeout(()=>{this.notificationService.remove('getOk')}, 2000);
        });
  }
}



