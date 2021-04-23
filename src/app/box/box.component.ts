import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {BoxService} from "../services/box.service";
import {AuthService} from "../services/auth.service";
import {Box} from "../model/box.model";
import {TypeCargoService} from "../services/typeCargo.service";
import {ClientService} from "../services/client.service";
import {TypeCargo} from "../model/typeCargo.model";
import {Client} from "../model/client.model";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  constructor(public location: Location,
              public boxService: BoxService,
              public authService: AuthService,
              public typeService: TypeCargoService,
              public clientService: ClientService,
              public notificationService: NotificationService) { }

  public typeCargoList: TypeCargo[] = [];
  public boxList: Box[] = [];
  public client: Client = null;

  ngOnInit(): void {
    this.showTypeAll();
    this.showClientByEmail();
    this.showBoxAll();
  }

  tId = null;
  name = null;
  height = null;
  width = null;
  weight = null;
  searchBoxByClientEmail: string = this.authService.getAuthEmail();

  showBoxAll():void{
    this.boxService.getBoxAll().subscribe((data: Box[]) => this.boxList = data,
      error => {
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=> {
        this.notificationService.add('getOk');
        setTimeout(()=>{this.notificationService.remove('getOk')}, 2000);
      });
  }

  showTypeAll():void{
    this.typeService.getType().subscribe((data:TypeCargo[])=>{this.typeCargoList = data},
      error => {
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{console.log('getType - OK')});
  }

  showClientByEmail():void{
    this.clientService.getClientByEmail(this.authService.getAuthEmail())
      .subscribe((data:Client)=>{this.client = data},
        error => {
          this.notificationService.add('getError');
          setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
        },
        ()=>{console.log('getClientByEmail - OK')});
  }

  goBack(): void {
    this.location.back();
  }

  createBox():void{
   if(this.name != null &&
     this.height != null &&
     this.width != null &&
     this.weight != null &&
     this.client != null &&
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
     boxNew.client = this.client;

     this.boxService.create(boxNew).subscribe(()=>{},
       error => {
         this.notificationService.add('createError');
         setTimeout(()=>{this.notificationService.remove('createError')}, 2000);
       },
       ()=>{this.showBoxAll();
         this.notificationService.add('createOk');
         setTimeout(()=>{this.notificationService.remove('createOk')}, 2000);
     });

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
        this.showBoxAll();
        this.notificationService.add('deleteOk', id);
        setTimeout(()=>{this.notificationService.remove('deleteOk')}, 2000);
      });
  }
}
