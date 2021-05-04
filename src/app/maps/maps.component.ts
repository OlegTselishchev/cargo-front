import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import * as mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  constructor() { }

  map: mapboxgl.Map;

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxKey;

    this.map = new mapboxgl.Map({
      container: 'map-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [37.6164917, 55.7528143], // starting position
      zoom: 12
    });

    // this.map.addControl(
    //     new MapboxDirections({
    //       accessToken: mapboxgl.accessToken
    //     }),
    //     'top-left'
    // );
  }
}
