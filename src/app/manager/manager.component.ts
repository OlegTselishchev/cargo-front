import { Component, OnInit } from '@angular/core';
import { OrderService} from "../services/order.service";


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(public orderService: OrderService) { }

  searchOrderName: string = '';
  searchOrderPrice: string = '';
  searchOrderWeight: string = '';
  searchOrderLocCity: string = '';
  searchOrderDestCity: string = '';

  ngOnInit(): void {
    this.showAllOrder();
  }

  showAllOrder(): void {
    this.orderService.showAllOrder();
  }

  public deleteById(id: number): void {
    this.orderService.delete(id);
  }

}
