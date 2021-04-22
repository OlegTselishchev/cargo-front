import {Component, Inject, OnInit} from '@angular/core';
import {Client} from "../model/client.model";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../services/client.service";
import {DialogData} from "../profile/profile.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public notificationService: NotificationService,
    private usersService: ClientService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  profile: Client;
  passwordConfirm: String;

  ngOnInit() {
    this.profile = {...this.data.profile}
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

  onSubmit() {
    if (this.profile.password == this.passwordConfirm) {
      this.usersService.modify(this.profile)
        .subscribe((response) => {
          if (response.status === 200) {
            this.notificationService.add('successfulUpdate');
            setTimeout(()=>{this.notificationService.remove('successfulUpdate')}, 2000);
            this.dialogRef.close("Yes");
          }
        }, error => {
          this.dialogRef.close("error");
        });
    } else {
      this.notificationService.add('equalsPassword');
      setTimeout(()=>{this.notificationService.remove('equalsPassword')}, 2000);
    }
  }
}
