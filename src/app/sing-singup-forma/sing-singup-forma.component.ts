import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Auth} from "../model/auth.model";
import {NotificationService} from "../services/notification.service";


@Component({
  selector: 'app-sing-singup-forma',
  templateUrl: './sing-singup-forma.component.html',
  styleUrls: ['./sing-singup-forma.component.css']
})
export class SingSingupFormaComponent implements OnInit {

  toggleForm : boolean = false
  auth: Auth = new Auth();
  regUser: Auth = new Auth();
  email;
  password1;
  password2;

  constructor(public authService: AuthService,
              public notificationService: NotificationService) { }

  ngOnInit(): void {}

  _clickSignup(): void{
    this.toggleForm = !this.toggleForm
  }

  login():void {
    if(this.auth.email != null && this.auth.email != ''  && this.auth.password != null && this.auth.password != '') {
      this.authService.login(this.auth);
    }else {
      this.notificationService.add('dataError');
      setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
    }
  }

  reg():void{
    if(this.email != null && this.email != ''
      && this.password1 != null && this.password1 != ''
      && this.password2 != null && this.password2 != ''){
      if(this.password1 == this.password2) {
        this.regUser.email = this.email;
        this.regUser.password = this.password1;
        this.authService.reg(this.regUser);
        }else {
        this.notificationService.add('equalsPassword');
        setTimeout(()=>{this.notificationService.remove('equalsPassword')}, 2000);
      }
    }else {
      this.notificationService.add('dataError');
      setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
    }

  }

}
