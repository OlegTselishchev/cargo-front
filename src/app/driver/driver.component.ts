import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { OrderService} from "../services/order.service";
import {Client} from "../model/client.model";
import {Order} from "../model/order.model";
import {Status} from "../model/status.model";
import {ClientService} from "../services/client.service";
import {AuthService} from "../services/auth.service";
import {StatusService} from "../services/status.service";
import {NotificationService} from "../services/notification.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {environment} from "../../environments/environment";
import * as mapboxgl from 'mapbox-gl';
import {Router} from "@angular/router";
import 'mapbox-gl/dist/mapbox-gl.css';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'status','price','loc','dest','volume', 'weight', 'take'];
  dataSource: any;

  displayedColumns1: string[] = ['id', 'name', 'status','price','loc','dest','volume', 'weight', 'impl', 'back'];
  dataSource1: any;

  public pageSize = 7;
  @ViewChild('mapElement')
  mapElement: ElementRef;
  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  constructor(public orderService: OrderService,
              public router: Router,
              public clientService: ClientService,
              private authService: AuthService,
              public statusService: StatusService,
              public notificationService: NotificationService,
              public cdr: ChangeDetectorRef) { }

  public statusList: Status[] = [];
  public orderList: Order[] = [];
  public driver: Client = new Client();
  public driverEmail: string = this.authService.getAuthEmail();
  public isOrderFull: boolean = true;
  public STATUS_OPEN: string = 'open';
  public STATUS_IN_WORK: string = 'in_work';
  public isLoaderOrderStatusOpen: boolean = false;
  public isLoaderOrderStatusImplement: boolean = false;
  public isLouderStatus: boolean = false;
  public isLoaderDriver: boolean = false;
  public map: mapboxgl.Map;


  ngOnInit(): void {
    this.showStatusAll();
    this.showClientByEmail();
    this.fillTableOrderByStatusOpen();
    // this.fillTableOrderByDriverIdAndStatusInWork();
    // this.createMap();

    (mapboxgl as any).accessToken = environment.mapboxKey;


  }

  ngAfterViewInit(){
    console.log(this.mapElement)
    this.map = new mapboxgl.Map({
      container: this.mapElement.nativeElement, // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [49.3859888, 53.5431899], // starting position
      zoom: 11
    });
    this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: false
          },
          trackUserLocation: true,
          fitBoundsOptions: {maxZoom:11}
        })
    );
  }

  fillTableOrderByStatusOpen():void{
    this.orderService.getOrderListByStatus(this.STATUS_OPEN).subscribe((result: Order[])=>{
        let array = [];
        result.forEach(function(item) {
          array.push({
            "id":item.id,
            "name":item.name,
            "status":item.status.name,
            "price":item.price,
            "loc":item.location.city,
            "dest":item.destination.city,
            "volume":item.box.volume.toFixed(4),
            "weight":item.box.weight
          });
        })
          this.orderList = result;
        this.dataSource  = new MatTableDataSource<any>(array);
        this.dataSource.paginator = this.paginator;
          this.createMarkers();
      },()=>{this.isLoaderOrderStatusOpen = false},
      ()=>{this.isLoaderOrderStatusOpen = true});
  }

  fillTableOrderByDriverIdAndStatusInWork():void{
    this.orderService.getOrderListByDriverIdAndStatus(this.authService.getClientId(), this.STATUS_IN_WORK)
      .subscribe((result: Order[])=>{
          let array = [];
          result.forEach(function(item) {
            array.push({
              "id":item.id,
              "name":item.name,
              "status":item.status.name,
              "price":item.price,
              "loc":item.location.city,
              "dest":item.destination.city,
              "volume":item.box.volume.toFixed(4),
              "weight":item.box.weight
            });
          })
          this.dataSource1  = new MatTableDataSource<any>(array);
          this.dataSource1.paginator = this.paginator;
        },()=>{this.isLoaderOrderStatusImplement = false},
        ()=>{this.isLoaderOrderStatusImplement = true});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  showClientByEmail():void{
    this.clientService.getClientByEmail(this.driverEmail).subscribe((data: Client)=>{this.driver = data},
      error => {
        this.isLoaderDriver = false;
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{
        this.isLoaderDriver = true;
        console.log('getClientByEmail-ok')})
  }

  showStatusAll(): void{
    this.statusService.getStatus().subscribe((data: Status[])=> {this.statusList = data},
      error => {
        this.isLouderStatus = false;
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{
        this.isLouderStatus = true;
        console.log('getStatus-ok')});
  }


  public modifyByIdStatusInWork(id: number, weight: number, volume: number): void {

    let carVolume = this.driver.car.volume;
    let carLiftingCapacity= this.driver.car.liftingCapacity;
    let trailerLiftingCapacity = 0;
    let trailerVolume = 0;

    if(this.driver.car.trailer != null){
      trailerLiftingCapacity = this.driver.car.trailer.liftingCapacity;
      trailerVolume = this.driver.car.trailer.volume;
    }

    if((carVolume >= volume && carLiftingCapacity >= weight) ||
      (trailerVolume >= volume && trailerLiftingCapacity >= weight)) {

      let status: Status = this.statusList.find(x => x.name == 'in_work');

      const order: Order = {
        id: id,
        name: null,
        destination: null,
        location: null,
        box: null,
        price: null,
        receiver: null,
        status: status,
        driver: this.driver
      };
      if (id != null) {
        if (order.driver.userId != null && order.status != null) {

          this.orderService.modify(order).subscribe(() => {
            },
            error => {
              this.notificationService.add('modifyError', id);
              setTimeout(() => {
                this.notificationService.remove('modifyError')
              }, 2000);
            },
            () => {
              this.fillTableOrderByStatusOpen();
              this.notificationService.add('modifyOk', id);
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

  public modifyByIdStatusImplemented(id: number): void {

    let key1 = prompt('Введи ключ');
    let key2: string = '0000';

    if(key1 == key2) {

      let status: Status = this.statusList.find(x => x.name == 'implemented');

      const order: Order = {
        id: id,
        name: null,
        destination: null,
        location: null,
        box: null,
        price: null,
        receiver: null,
        status: status,
        driver: this.driver
      };
      if (id != null) {
        if (order.driver.userId != null && order.status != null) {
          this.orderService.modify(order).subscribe(()=>{},
            error => {
              this.notificationService.add('modifyError', id);
              setTimeout(()=>{this.notificationService.remove('modifyError')}, 2000);
            },
            ()=>{
              this.fillTableOrderByDriverIdAndStatusInWork()
              this.notificationService.add('modifyOk', id);
              setTimeout(()=>{this.notificationService.remove('modifyOk')}, 2000);
            });
        } else {
          this.notificationService.add('dataError');
          setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
        }
      } else {
        this.notificationService.add('dataError');
        setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
      }
    }else {
      this.notificationService.add('keyError');
      setTimeout(()=>{this.notificationService.remove('keyError')}, 2000);
    }
  }


  public modifyStatusOpen(id: number): void {

    let status: Status = this.statusList.find(x => x.name == 'open');

    const order: Order = {
      id: id,
      name: null,
      destination: null,
      location: null,
      box: null,
      price: null,
      receiver: null,
      status: status,
      driver: null
    };
    if(id != null && order.status != null){
      this.orderService.modify(order).subscribe(()=>{},
        error => {
          this.notificationService.add('modifyError', id);
          setTimeout(()=>{this.notificationService.remove('modifyError')}, 2000);
        },
        ()=>{
          this.fillTableOrderByDriverIdAndStatusInWork();
          this.notificationService.add('modifyOk', id);
          setTimeout(()=>{this.notificationService.remove('modifyOk')}, 2000);
        });
    }else {
      this.notificationService.add('dataError');
      setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
    }
  }

  add(id: number, ln: string, fn: string, mn: string): void {
    this.driver.userId = id;
    this.driver.lastName = ln;
    this.driver.firstName = fn;
    this.driver.middleName = mn;
  }

  myOrder(): void {
    this.isOrderFull = false;
    this.fillTableOrderByDriverIdAndStatusInWork();
  }

  fullOrders():void {
    this.isOrderFull = true;
    this.fillTableOrderByStatusOpen();
  }

  // public createMap() {
  //   this.map = new mapboxgl.Map({
  //     container: this.mapElement.nativeElement, // container id
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: [49.3859888, 53.5431899], // starting position
  //     zoom: 11
  //   });
  //   this.map.addControl(
  //       new mapboxgl.GeolocateControl({
  //         positionOptions: {
  //           enableHighAccuracy: false
  //         },
  //         trackUserLocation: true,
  //         fitBoundsOptions: {maxZoom:11}
  //       })
  //   );
  // }

  public createMarkers(){
    for (var i = 0; i < this.orderList.length; i++) {

      var html = '<h2>' + this.orderList[i].box.name +'</h2>'+
          '<b>To:</b><br> ' +
          '<b>Country: </b> ' +
          '<span>' + this.orderList[i].location.country + ' </span>' +
          '<b>City: </b> ' +
          '<span>' + this.orderList[i].location.city + ' </span><br>' +
          '<b>Street: </b> ' +
          '<span>' + this.orderList[i].location.street+ ' </span><br> ' +
          '<b>Home: </b> ' +
          '<span>' + this.orderList[i].location.home+ ' </span> ' +
          '<b>Apartment: </b> ' +
          '<span>' + this.orderList[i].location.apartment + '</span><br>' +
          '<a target="_blank" href="/orderDetail/' + this.orderList[i].id +'" ><b>details</ b></a>';

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

}
