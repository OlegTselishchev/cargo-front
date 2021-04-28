import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";

import * as mapboxgl from 'mapbox-gl';
import {Order} from "../model/order.model";
import {OrderService} from "../services/order.service";
import {NotificationService} from "../services/notification.service";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Router} from "@angular/router";



@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {


  constructor(public orderService: OrderService,
              public notificationService: NotificationService,
              public router: Router,) { }

  map: mapboxgl.Map;
  public orderList: Order[] = [];
  private $scope: any;

  ngOnInit(): void {
    this.showAllOrder();

    (mapboxgl as any).accessToken = environment.mapboxKey;

    this.map = new mapboxgl.Map({
      container: 'map-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [49.3859888, 53.5431899], // Lng Lat
      zoom: 11
    });

    this.map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
        })
    );
  }


  createMarker(lng: number, lat: number){
    // var popup = new mapboxgl.Popup({ offset: 25 })
    //     .setText(
    //     'Construction on the Washington Monument began in 1848.'
    // );
    //
    // // create DOM element for the marker
    // var el = document.createElement('div');
    // el.id = 'marker';
    //
    const marker = new mapboxgl.Marker({
      draggable: false
    })
        .setLngLat([49.28035, 53.515266])
        .addTo(this.map);
  }

 public popupClick(){
  // this.router.navigate(['/profile']);
  console.log('test');
}



  createMarkers(){
    // const st = '<div> <a href="/profile"> Добавить</a> </div>'
    const st = '<div> <button onClick="this.popupClick()"> Добавить</button> </div>'
    for (var i = 0; i < this.orderList.length; i++) {

      var html = '<button onclick=this.popupClick()>test</button>';

      var popup = new mapboxgl.Popup({ offset: 25 })
          // .setText(
          //     this.orderList[i].name + ' Куда: ' + this.orderList[i].destination.city +
          //     ',  улица: ' + this.orderList[i].destination.street +
          //     ', Дом: ' + this.orderList[i].destination.apartment  + ' ' +
          //     this.orderList[i].box.typeCargo.name
          .setHTML(html);

          // create DOM element for the marker
          var el = document.createElement('div');
          el.id = 'marker';

          const marker = new mapboxgl.Marker({
          draggable: false
          })
            .setLngLat([this.orderList[i].location.lng, this.orderList[i].location.lat])
            .setPopup(popup)
            .addTo(this.map);

    }
  }

  showAllOrder(): void {
    this.orderService.getOrderList().subscribe((data:Order[])=>{this.orderList = data},
        error => {
          this.notificationService.add('getError');
          setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
        },
        (result = 'complete')=>{
          this.createMarkers()
          this.notificationService.add('getOk');
          setTimeout(()=>{this.notificationService.remove('getOk')}, 2000);
        });
  }
}

