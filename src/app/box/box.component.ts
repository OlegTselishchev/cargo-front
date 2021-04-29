import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {BoxService} from "../services/box.service";
import {AuthService} from "../services/auth.service";
import {Box} from "../model/box.model";
import {TypeCargoService} from "../services/typeCargo.service";
import {TypeCargo} from "../model/typeCargo.model";
import {Client} from "../model/client.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NotificationService} from "../services/notification.service";


@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  displayedColumns: string[] = ['boxId', 'name', 'weight','volume','width','height','typeCargo', 'delete'];
  dataSource: any;

  public pageSize = 1;

  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  constructor(public location: Location,
              public boxService: BoxService,
              public authService: AuthService,
              public typeService: TypeCargoService,
              public notificationService: NotificationService
             ) { }

  public typeCargoList: TypeCargo[] = [];
  public boxList: Box[] = [];

  tId = null;
  name = null;
  height = null;
  width = null;
  weight = null;

  isLoadingBox: boolean = false;
  isLoadingType: boolean = false;

  ngOnInit(): void {
    this.fillTableBox();
    this.showTypeAll();
  }


  fillTableBox():void{
    this.boxService.getBoxByClientId(this.authService.getClientId()).subscribe((result: Box[])=>{
      let array = [];
      result.forEach(function(item) {
        array.push({
          "boxId":item.boxId,
          "name":item.name,
          "weight":item.weight,
          "volume":item.volume.toFixed(4),
          "width":item.width,
          "height":item.height,
          "typeCargo":item.typeCargo.name});
      })
      this.dataSource  = new MatTableDataSource<any>(array);
      this.dataSource.paginator = this.paginator;
    },
      ()=>{this.isLoadingBox = false},
      ()=>{this.isLoadingBox = true});

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showTypeAll():void{
    this.typeService.getType().subscribe((data:TypeCargo[])=>{this.typeCargoList = data},
      error => {
        this.isLoadingType = false;
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{
        this.isLoadingType = true;
        console.log('getType - OK')});
  }

  goBack(): void {
    this.location.back();
  }

  createBox():void{
    let client: Client = new Client();
    client.userId = +this.authService.getClientId();

   if(this.name != null &&
     this.height != null &&
     this.width != null &&
     this.weight != null &&
     client.userId != null &&
     this.tId != null
   ){
     let type: TypeCargo = new TypeCargo();
     type.typeId = this.tId;

     let height = this.height / 100;
     let width = this.width / 100;

     let boxNew: Box = new Box();
     boxNew.name = this.name;
     boxNew.height = this.height;
     boxNew.width = this.width;
     boxNew.weight = this.weight;
     boxNew.volume = height * width * width;
     boxNew.typeCargo = type;
     boxNew.client = client;

     this.boxService.create(boxNew).subscribe(()=>{},
       error => {
         this.notificationService.add('createError');
         setTimeout(()=>{this.notificationService.remove('createError')}, 2000);
       },
       ()=>{
         this.fillTableBox();
         this.notificationService.add('createOk');
         setTimeout(()=>{this.notificationService.remove('createOk')}, 2000);
     });
     this.name = null;
     this.width = null;
     this.weight = null;
     this.height = null;
     this.tId = null;


   }else {
     this.notificationService.add('dataError');
     setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
   }
  }

  delete(id: number):void{
    this.boxService.deleteById(id).subscribe(() => {
      },
      error => {
        this.notificationService.add('deleteError', id);
        setTimeout(()=>{this.notificationService.remove('deleteError')}, 2000);
      },
      () => {
        this.fillTableBox();
        this.notificationService.add('deleteOk', id);
        setTimeout(()=>{this.notificationService.remove('deleteOk')}, 2000);
      });
  }
}
