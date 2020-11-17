import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Observable } from 'rxjs';
import { Ingredient } from '../../../shared/ingredient.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders: any = [];
  // public orders: Observable<any>;


  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.orderService.getAll().subscribe(
        responseData => {
          for (const key in responseData) {
          this.orders.push({...responseData[key], id: key });
        }
      }
      );
    }

    objectValues(obj) {
      return Object.values(obj);
    }

}
