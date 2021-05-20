import {Component, Inject, OnInit} from '@angular/core';
import {Car} from "../model/car.model";
import {ActivatedRoute} from "@angular/router";
import {CarService} from "../services/car.service";
import {Client} from "../model/client.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../profile/profile.component";
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-add-or-delete-car',
  templateUrl: './add-car-model.html',
  styleUrls: ['./add-car-model.css']
})
export class AddCarModel implements OnInit {

  constructor(
              private route: ActivatedRoute,
              public notificationService: NotificationService,
              private carService: CarService,
              private authService: AuthService,
              public dialogRef: MatDialogRef<AddCarModel>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  newCar: Car = new Car();
  profile: Client;


  ngOnInit(): void {
    this.newCar.client =  {...this.data.profile}
  }


  onSubmit() {
    if(this.newCar.volume > 0 && this.newCar.volume < 999999 &&
      this.newCar.liftingCapacity > 0 && this.newCar.liftingCapacity < 999999) {
      this.carService.create(this.newCar)
        .subscribe((response) => {
            if (response.status === 200) {
              this.dialogRef.close("Yes");
              this.notificationService.add('successfulUpdate');
              setTimeout(() => {
                this.notificationService.remove('successfulUpdate')
              }, 2000);
            }
          }, error => {
            this.dialogRef.close("error");
          },
          () => {
            this.authService.setIsDriver('true')
          });
    }else {
      this.notificationService.add('errorVolumeAndLiftingCapacity');
      setTimeout(()=>{this.notificationService.remove('errorVolumeAndLiftingCapacity')},2000);
    }
  }


  onNoClick(): void {
    this.dialogRef.close("cancel");
  }
}
