import { Component } from '@angular/core';
import {NotificationService} from "./services/notification.service";
import {LoaderService} from "./services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public notificationService: NotificationService,
              public loaderService: LoaderService) {
  }

   get loading():boolean{
    return this.loaderService.isLoading;
  }

}
