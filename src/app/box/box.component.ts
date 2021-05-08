import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {BoxService} from "../services/box.service";
import {AuthService} from "../services/auth.service";
import {Box} from "../model/box.model";
import {TypeCargoService} from "../services/typeCargo.service";
import {ClientService} from "../services/client.service";
import {TypeCargo} from "../model/typeCargo.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NotificationService} from "../services/notification.service";
import {CreateBoxComponent} from "../create-box/create-box.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  displayedColumns: string[] = ['boxId', 'name', 'weight','volume','width','height','typeCargo', 'delete'];
  dataSource: any;

  public pageSize = 1;

  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  constructor(public location: Location,
              public boxService: BoxService,
              public dialog: MatDialog,
              public authService: AuthService,
              public typeService: TypeCargoService,
              public clientService: ClientService,
              public notificationService: NotificationService) { }

  public typeCargoList: TypeCargo[] = [];
  public boxList: Box[] = [];

  public isLoaderBox: boolean = false;
  public isLoaderType: boolean = false;

  ngOnInit(): void {
    this.fillTableBox();
    this.showTypeAll();
  }

  fillTableBox():void{
    this.boxService.getBoxByClientId(this.authService.getClientId()).subscribe((result: Box[])=>{
        let array = [];
        result.forEach(function(item) {
          array.push({
            "boxId":item.boxId,
            "name":item.name,
            "weight":item.weight,
            "volume":item.volume.toFixed(4),
            "width":item.width,
            "height":item.height,
            "typeCargo":item.typeCargo.name});
        })
        this.dataSource  = new MatTableDataSource<any>(array);
        this.dataSource.paginator = this.paginator;
      },
      ()=>{this.isLoaderBox = false},
      ()=>{this.isLoaderBox = true});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showTypeAll():void{
    this.typeService.getType().subscribe((data:TypeCargo[])=>{this.typeCargoList = data},
      error => {
        this.isLoaderType = false;
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{
        this.isLoaderType = true;
        this.notificationService.add('getOk');
        setTimeout(()=>{this.notificationService.remove('getOk')}, 2000)});
  }

  goBack(): void {
    this.location.back();
  }

  createBox() {
    const addBox = this.dialog.open(CreateBoxComponent)
    addBox.afterClosed().subscribe(result => {
      if (result === "Yes") {
        this.fillTableBox();
      } else if (result === "error") {
      }
    });
  };

  delete(id: number):void{
    this.boxService.deleteById(id).subscribe(() => {
      },
      error => {
        this.notificationService.add('deleteError', id);
        setTimeout(()=>{this.notificationService.remove('deleteError')}, 2000);
      },
      () => {
        this.fillTableBox();
        this.notificationService.add('deleteOk', id);
        setTimeout(()=>{this.notificationService.remove('deleteOk')}, 2000);
      });
  }
}
