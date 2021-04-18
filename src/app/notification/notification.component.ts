import {Component, Input, OnInit} from '@angular/core';
import {Notification} from "../model/notification.model";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  public model: Notification;


}
