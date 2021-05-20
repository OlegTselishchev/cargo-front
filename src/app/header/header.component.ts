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
    this.driverPage();
    this.managerPage();
  }

  isDriverPage: boolean = false;
  isManagerPage: boolean = false;


  activeDriverPage(){
    localStorage.setItem('activeManager', 'false');
    localStorage. setItem('activeDriver', 'true');

    this.isDriverPage = true;
    this.isManagerPage = false;
  }

  activeManagerPage(){
    localStorage.setItem('activeManager', 'true');
    localStorage. setItem('activeDriver', 'false');

    this.isDriverPage = false;
    this.isManagerPage = true;
  }

  activeProfilePage(){
    localStorage.setItem('activeManager', 'false');
    localStorage. setItem('activeDriver', 'false');
    this.isDriverPage = false;
    this.isManagerPage = false;
  }

  activeLogoutPage(){
    localStorage.setItem('activeManager', 'false');
    localStorage. setItem('activeDriver', 'false');
    this.isDriverPage = false;
    this.isManagerPage = false;
  }

  driverPage(): void{
    if(localStorage.getItem('activeDriver') == 'true'){
      this.isDriverPage = true;
    }else this.isDriverPage = false;
  }

  managerPage(): void{
    if(localStorage.getItem('activeManager') == 'true'){
      this.isManagerPage = true;
    }else this.isManagerPage = false;
  }


  logout():void{
    this.activeLogoutPage();
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
