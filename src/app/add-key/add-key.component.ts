import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../profile/profile.component";
import {KeyService} from "../services/key.service";


@Component({
  selector: 'app-add-key',
  templateUrl: './add-key.component.html',
  styleUrls: ['./add-key.component.css']
})

export class AddKeyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public keyService: KeyService,
    public dialogRef: MatDialogRef<AddKeyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  key: string = '';

  onSubmit():void {
        this.keyService.key = this.key;
        this.onNoClick();
    }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

}
