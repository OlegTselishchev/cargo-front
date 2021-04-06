import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {StatusService} from "../services/status.service";
import {ClientService} from "../services/client.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,
             ) { }

  ngOnInit(): void {
  }

  public get isLoggedIn(): boolean{
    return this.authService.isAuthenticated()
  }
}
