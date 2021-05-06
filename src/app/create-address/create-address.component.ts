import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {TypeCargoService} from "../services/typeCargo.service";
import {BoxService} from "../services/box.service";
import {NotificationService} from "../services/notification.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../profile/profile.component";
import {AddressService} from "../services/address.service";
import {Address} from "../model/address.model";

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public typeService: TypeCargoService,
    private addressService: AddressService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  public newAddress: Address = new Address();

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.newAddress.country != null && this.newAddress.country != '' &&
      this.newAddress.city != null && this.newAddress.city != '' &&
      this.newAddress.street != null && this.newAddress.street != '' &&
      this.newAddress.home != null && this.newAddress.home != '' &&
      this.newAddress.apartment != null && this.newAddress.apartment != '') {
      this.addressService.create(this.newAddress)
        .subscribe(() => {
          },
          error => {
            this.dialogRef.close("error");
            this.notificationService.add('createError');
            setTimeout(() => {
              this.notificationService.remove('createError')
            }, 2000);
          },
          () => {
            this.dialogRef.close("Yes");
            this.notificationService.add('successfulUpdate');
            setTimeout(() => {
              this.notificationService.remove('successfulUpdate')
            }, 2000);
          });
    }else {
      this.notificationService.add('dataError');
      setTimeout(()=>{this.notificationService.remove('dataError')}, 2000);
    }
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

}
