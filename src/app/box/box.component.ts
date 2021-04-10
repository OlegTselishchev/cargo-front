import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {BoxService} from "../services/box.service";
import {AuthService} from "../services/auth.service";
import {Box} from "../model/box.model";
import {TypeCargoService} from "../services/typeCargo.service";
import {ClientService} from "../services/client.service";
import {TypeCargo} from "../model/typeCargo.model";
import {Client} from "../model/client.model";

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
              public clientService: ClientService) { }

  public typeCargoList: TypeCargo[] = [];
  public boxList: Box[] = [];
  public client: Client = null;

  ngOnInit(): void {
    this.typeService.getType().subscribe((data:TypeCargo[])=>{this.typeCargoList = data});
    this.clientService.getClientByEmail(this.authService.getAuthEmail()).subscribe((data:Client)=>{this.client = data});
    this.showBoxAll();
  }

  tId = null;
  name = null;
  height = null;
  width = null;
  weight = null;
  searchBoxByClientEmail: string = this.authService.getAuthEmail();

  showBoxAll():void{
    this.boxService.getBoxAll().subscribe((data: Box[]) => this.boxList = data);
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

     let boxNew: Box = new Box();
     boxNew.name = this.name;
     boxNew.height = this.height;
     boxNew.width = this.width;
     boxNew.weight = this.weight;
     boxNew.volume = this.width * this.width * this.height;
     boxNew.typeCargo = type;
     boxNew.client = this.client;

     this.boxService.create(boxNew).subscribe(()=>{},
       error => {alert('error box create')},
       ()=>{this.showBoxAll()});

   }else alert('not data');
  }
}
