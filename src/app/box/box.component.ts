import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {BoxService} from "../services/box.service";
import {AuthService} from "../services/auth.service";
import {Box} from "../model/box.model";
import {TypeCargoService} from "../services/typeCargo.service";
import {ClientService} from "../services/client.service";
import {TypeCargo} from "../model/typeCargo.model";

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

  ngOnInit(): void {
    this.typeService.showAllTypes();
    this.clientService.showClientByEmail(this.authService.getAuthEmail());
  }

  tId = null;
  name = null;
  height = null;
  width = null;
  weight = null;
  searchBoxByClientEmail: string = this.authService.getAuthEmail();

  showBoxAll():void{
    this.boxService.showAllBox();
  }

  goBack(): void {
    this.location.back();
  }

  createBox():void{
   if(this.name != null &&
     this.height != null &&
     this.width != null &&
     this.weight != null &&
     this.clientService.client != null &&
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
     boxNew.client = this.clientService.client;

     this.boxService.create(boxNew);

   }else alert('not data');
  }
}
