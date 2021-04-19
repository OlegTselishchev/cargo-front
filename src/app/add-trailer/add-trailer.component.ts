import {Component, Inject, OnInit} from '@angular/core';
import {Car} from "../model/car.model";
// import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {CarService} from "../services/car.service";
import {Client} from "../model/client.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../profile/profile.component";


@Component({
  selector: 'app-add-or-delete-car',
  templateUrl: './add-car-model.html',
  styleUrls: ['./add-car-model.css']
})
export class addTrailerComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    public dialogRef: MatDialogRef<addTrailerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  newCar: Car = new Car();
  profile: Client;


  ngOnInit(): void {
    this.newCar.client =  {...this.data.profile}
  }


  onSubmit() {
    this.carService.create(this.newCar)
      .subscribe((response) => {
        if (response.status === 200) {
          this.dialogRef.close("Yes");
        }
      },  error => {
        alert('error');
      });
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }
}
