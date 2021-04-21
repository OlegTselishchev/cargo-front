import { Component, OnInit } from '@angular/core';
import {ClientService} from "../services/client.service";
import {Client} from "../model/client.model";
import {Location} from "@angular/common";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor( public clientService: ClientService,
               public location: Location,
               public notificationService: NotificationService) { }

  public clientList: Client[] = [];

  ngOnInit(): void {
    this.showClient();
  }

  searchByLastName: string = '';
  clientNew: Client = new Client();

  showClient(): void {
    this.clientService.getClientAll().subscribe((data: Client[])=>{
      this.clientList = data;
    },
      error => {
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{
        this.notificationService.add('getOk');
        setTimeout(()=>{this.notificationService.remove('getOk')}, 2000);
      });
  }


  delete(id: number) {
    this.clientService.delete(id).subscribe(()=>{},
      error => {
        this.notificationService.add('deleteError', id);
        setTimeout(()=>{this.notificationService.remove('deleteError')}, 2000);
      },
      ()=>{this.showClient();
        this.notificationService.add('deleteOk', id);
        setTimeout(()=>{this.notificationService.remove('deleteOk')}, 2000);
        }
      );
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

      this.clientService.create(client).subscribe(()=>{},
        error => {
          this.notificationService.add('createError');
          setTimeout(()=>{this.notificationService.remove('createError')}, 2000);},
        ()=>{this.showClient();
          this.notificationService.add('createOk');
          setTimeout(()=>{this.notificationService.remove('createOk')}, 2000);
          }
        );

      this.clientNew.lastName = '';
      this.clientNew.firstName = '';
      this.clientNew.middleName = '';
      this.clientNew.phone = '';
      this.clientNew.email = '';
      this.clientNew.driveCategory = '';
    } else {
      this.notificationService.add('dataError');
      setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
