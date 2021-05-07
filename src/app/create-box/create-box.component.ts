import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../services/notification.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../profile/profile.component";
import {Box} from "../model/box.model";
import {AuthService} from "../services/auth.service";
import {TypeCargo} from "../model/typeCargo.model";
import {TypeCargoService} from "../services/typeCargo.service";
import {BoxService} from "../services/box.service";
import {FormControl} from "@angular/forms";
import {Client} from "../model/client.model";
import {ClientService} from "../services/client.service";

@Component({
  selector: 'app-create-box',
  templateUrl: './create-box.component.html',
  styleUrls: ['./create-box.component.css']
})
export class CreateBoxComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public clientService: ClientService,
              private authService: AuthService,
              public typeService: TypeCargoService,
              private boxService: BoxService,
              public notificationService: NotificationService,
              public dialogRef: MatDialogRef<CreateBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
  public typeCargoList: TypeCargo[] = [];
  newBox: Box = new Box();
  test = new FormControl();
  public currentId: number = parseInt (this.authService.getClientId());
  profile: Client = new Client();

  searchBoxByClientEmail: string = this.authService.getAuthEmail();

  ngOnInit(): void {
    this.typeService.getType().subscribe((data:TypeCargo[])=>{this.typeCargoList = data});
    this.showClient();
  }

  showClient(): void {
    this.clientService
      .showById(this.currentId)
      .subscribe(data => {
        this.profile = data;
        this.newBox.client = this.profile;
      }, error => {
        console.log("error get profile");
      });
  }

  onSubmit() {
    this.newBox.typeCargo = new TypeCargo();
    this.newBox.typeCargo.typeId = this.test.value;
    this.calculateVolume();
    this.boxService.create(this.newBox)
      .subscribe((response) => {
        if (response.status === 200) {
          this.dialogRef.close("Yes");
          this.notificationService.add('successfulUpdate');
          setTimeout(()=>{this.notificationService.remove('successfulUpdate')}, 2000);
        }
      },  error => {
        this.dialogRef.close("Error");
      });
  }

  calculateVolume(){
    this.newBox.volume = (this.newBox.height * this.newBox.width * this.newBox.width)/1000000;
}

  onNoClick(): void {
    this.dialogRef.close("Cancel");
  }
}
