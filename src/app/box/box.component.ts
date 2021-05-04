import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {BoxService} from "../services/box.service";
import {AuthService} from "../services/auth.service";
import {Box} from "../model/box.model";
import {TypeCargoService} from "../services/typeCargo.service";
import {ClientService} from "../services/client.service";
import {TypeCargo} from "../model/typeCargo.model";
import {Client} from "../model/client.model";
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
  displayedColumns: string[] = ['boxId', 'name', 'weight','volume','width','height','typeCargo'];
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
  public client: Client = null;
  newBox: Box = new Box();

  ngOnInit(): void {
    this.typeService.getType().subscribe((data:TypeCargo[])=>{this.typeCargoList = data});
    this.clientService.getClientByEmail(this.authService.getAuthEmail()).subscribe((data:Client)=>{this.client = data});

    this.boxService.getBoxAll().subscribe((result: Box[])=>{
      let array = [];
      result.forEach(function(item) {
        console.log(item.name + "111");
        array.push({"boxId":item.boxId, "name":item.name, "weight":item.weight,"volume":item.volume,"width":item.width, "height":item.height,
        "typeCargo":item.typeCargo.name});
        })
      this.dataSource  = new MatTableDataSource<any>(array);
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  tId = null;
  name = null;
  height = null;
  width = null;
  weight = null;
  searchBoxByClientEmail: string = this.authService.getAuthEmail();

  showBoxAll():void{
    this.boxService.getBoxAll().subscribe((data: Box[]) => this.boxList = data,
      error => {
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=> {
        this.notificationService.add('getOk');
        setTimeout(()=>{this.notificationService.remove('getOk')}, 2000);
      });
  }

  showTypeAll():void{
    this.typeService.getType().subscribe((data:TypeCargo[])=>{this.typeCargoList = data},
      error => {
        this.notificationService.add('getError');
        setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
      },
      ()=>{console.log('getType - OK')});
  }

  showClientByEmail():void{
    this.clientService.getClientByEmail(this.authService.getAuthEmail())
      .subscribe((data:Client)=>{this.client = data},
        error => {
          this.notificationService.add('getError');
          setTimeout(()=>{this.notificationService.remove('getError')}, 2000);
        },
        ()=>{console.log('getClientByEmail - OK')});
  }

  goBack(): void {
    this.location.back();
  }

  createBox() {
    const addBox = this.dialog.open(CreateBoxComponent)
    addBox.afterClosed().subscribe(result => {
      if (result === "Yes") {
        this.showBoxAll();
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
        this.showBoxAll();
        this.notificationService.add('deleteOk', id);
        setTimeout(()=>{this.notificationService.remove('deleteOk')}, 2000);
      });
  }
}
