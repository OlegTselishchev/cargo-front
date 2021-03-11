import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../model/order.model";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  public modelOrder: Order;

  @Output()
  public onRemove: EventEmitter<number> = new EventEmitter<number>();

  public _onRemove(): void {
    this.onRemove.emit(this.modelOrder.id);
  }
}
