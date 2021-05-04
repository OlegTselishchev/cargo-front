import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Auth} from "../model/auth.model";
import {NotificationService} from "../services/notification.service";
import {Client} from "../model/client.model";


@Component({
  selector: 'app-sing-singup-forma',
  templateUrl: './sing-singup-forma.component.html',
  styleUrls: ['./sing-singup-forma.component.css']
})
export class SingSingupFormaComponent implements OnInit {

  toggleForm : boolean = false
  auth: Auth = new Auth();
  regUser: Client = new Client();
  lastName;
  firstName;
  middleName;
  phone;
  email;
  passwordPrimary;
  passwordSecondary;

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
    if(this.firstName != null && this.firstName != ''
      && this.lastName != null && this.firstName != ''
      && this.middleName != null && this.middleName != ''
      && this.phone != null && this.phone != ''
      && this.email != null && this.email != ''
      && this.passwordPrimary != null && this.passwordPrimary != ''
      && this.passwordSecondary != null && this.passwordSecondary != ''){
      if(this.passwordPrimary == this.passwordSecondary) {
        this.regUser.email = this.email;
        this.regUser.password = this.passwordPrimary;
        this.regUser.lastName = this.lastName;
        this.regUser.firstName = this.firstName;
        this.regUser.middleName = this.middleName;
        this.regUser.phone = this.phone;
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
