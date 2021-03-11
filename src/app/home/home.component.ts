import { Component, OnInit } from '@angular/core';
import {AddressService} from "../services/address.service";
import {ClientService} from "../services/client.service";
import {BoxService} from "../services/box.service";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
