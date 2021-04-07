import { Component, OnInit } from '@angular/core';
import {ClientService} from "../services/client.service";
import {Client} from "../model/client.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor( public clientService: ClientService, public location: Location) { }

  ngOnInit(): void {
  }

  searchByLastName: string = '';
  clientNew: Client = new Client();

  showClient(): void {
    this.clientService.showAllClient();
  }

  delete(id: number) {
    this.clientService.delete(id);
  }

  addClient(): void {

    const client: Client = {
      lastName: this.clientNew.lastName,
      firstName: this.clientNew.firstName,
      middleName: this.clientNew.middleName,
      phone: this.clientNew.phone,
      email: this.clientNew.email,
      driveCategory: this.clientNew.driveCategory,
    password: this.clientNew.password};


    if (client.lastName != null && client.lastName !== '' &&
      client.firstName != null && client.firstName !== '' &&
      client.middleName != null && client.middleName !== '' &&
      client.phone != null && client.phone !== '' &&
      client.email != null && client.email !== '' ) {

      this.clientService.create(client);

      this.clientNew.lastName = '';
      this.clientNew.firstName = '';
      this.clientNew.middleName = '';
      this.clientNew.phone = '';
      this.clientNew.email = '';
      this.clientNew.driveCategory = '';
    } else { alert('введите данные клиента'); }
  }

  goBack(): void {
    this.location.back();
  }
}
