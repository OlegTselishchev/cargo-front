import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../profile/profile.component";
import {TrailerService} from "../services/trailer.service";

import {Trailer} from "../model/trailer.model";

@Component({
  selector: 'app-add-trailer',
  templateUrl: './add-trailer.component.html',
  styleUrls: ['./add-trailer.component.css']
})
export class AddTrailerComponent implements OnInit {

  constructor( private route: ActivatedRoute,
               private trailerService: TrailerService,
               public dialogRef: MatDialogRef<AddTrailerComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  newTrailer: Trailer = new Trailer();

  ngOnInit(): void {
    this.newTrailer.car =  {...this.data.profile.car}
  }

  onSubmit() {
    this.trailerService.create(this.newTrailer)
        .subscribe((response) => {
          if (response.status === 200) {
            this.dialogRef.close("Yes");
          }
        },  error => {
          alert('error');
            this.dialogRef.close("error");
        });
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }
}
