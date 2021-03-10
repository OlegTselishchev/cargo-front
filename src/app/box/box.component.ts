import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {BoxService} from "../services/box.service";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  constructor(public location: Location, public boxService: BoxService) { }

  ngOnInit(): void {
  }

  showBoxAll():void{
    this.boxService.showAllBox();
  }


  goBack(): void {
    this.location.back();
  }
}
