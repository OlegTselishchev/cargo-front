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

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  displayedColumns: string[] = ['boxId', 'name', 'weight','volume','width','height','type'];
// , 'destination','location','box','receiver','status','driver'
  // dataSource = new MatTableDataSource();

  dataSource: any;

  public pageSize = 1;

  @ViewChild
  (MatPaginator) paginator: MatPaginator;

  constructor(public location: Location,
              public boxService: BoxService,
              public authService: AuthService,
              public typeService: TypeCargoService,
              public clientService: ClientService) { }

  public typeCargoList: TypeCargo[] = [];
  public boxList: Box[] = [];
  public client: Client = null;

  ngOnInit(): void {
    this.typeService.getType().subscribe((data:TypeCargo[])=>{this.typeCargoList = data});
    this.clientService.getClientByEmail(this.authService.getAuthEmail()).subscribe((data:Client)=>{this.client = data});
    // this.showBoxAll();

    this.boxService.getBoxAll().subscribe((result: Box[])=>{
      let array = [];
      result.forEach(function(item) {
        console.log(item.name + "111");
        array.push({"boxId":item.boxId, "name":item.name, "weight":item.weight,"volume":item.volume,"width":item.width, "height":item.height,
        "type":item.typeCargo});
        // ,"destination":item.destination,
        //     "location":item.location, "box":item.box, "receiver":item.receiver, "status":item.status,"driver":item.driver
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
    this.boxService.getBoxAll().subscribe((data: Box[]) => this.boxList = data);
  }

  goBack(): void {
    this.location.back();
  }

  createBox():void{
   if(this.name != null &&
     this.height != null &&
     this.width != null &&
     this.weight != null &&
     this.client != null &&
     this.tId != null
   ){
     let type: TypeCargo = new TypeCargo();
     type.typeId = this.tId;

     let boxNew: Box = new Box();
     boxNew.name = this.name;
     boxNew.height = this.height;
     boxNew.width = this.width;
     boxNew.weight = this.weight;
     boxNew.volume = this.width * this.width * this.height;
     boxNew.typeCargo = type;
     boxNew.client = this.client;

     this.boxService.create(boxNew).subscribe(()=>{},
       error => {alert('error box create')},
       ()=>{this.showBoxAll()});

   }else alert('not data');
  }
}
