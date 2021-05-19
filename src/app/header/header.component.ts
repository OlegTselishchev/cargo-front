import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isDriver: boolean = false;
  isManager: boolean = false;

  activeDriver(){
    this.isDriver = true;
    this.isManager = false;
  }

  activeManager(){
    this.isDriver = false;
    this.isManager = true;
  }

  activeProfile(){
    this.isDriver = false;
    this.isManager = false;
  }

  logout():void{
    this.isDriver = false;
    this.isManager = false;
    this.authService.logout();
  }

  public get isLoggedIn(): boolean{
    return this.authService.isAuthenticated()
  }

  public get isLoggedAndDriver(): boolean{
    if(this.authService.isAuthenticated() && this.authService.isDriver()){
      return true;
    }else return false;
  }

}
