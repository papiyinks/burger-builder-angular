import { Location } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../orders/list/order.service';



@Component({
  selector: 'app-checkoutsummary',
  templateUrl: './checkoutsummary.component.html',
  styleUrls: ['./checkoutsummary.component.css']
})
export class CheckoutsummaryComponent implements OnInit {
  open = false;
  @Input() state: any;
  @ViewChild('checkOutSummaryForm', { static: false }) slForm: NgForm;
  public orderIngredients: any;
  totalPrice: any;
  user: any;
  ingredients: any;


  constructor(
    private location: Location,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrderIngredients();
  }

  checkoutContinuedHandler() {
    this.open = true;
  }

  cancel() {
    this.location.back();
  }



  getOrderIngredients() {
    this.orderIngredients = JSON.parse(localStorage.getItem('orderData'));
    this.totalPrice = JSON.parse(localStorage.getItem('price'));
    this.ingredients = JSON.parse(localStorage.getItem('orderItem') || '[]');
    this.user = localStorage.getItem('userId').replace(/['"]+/g, '');
  }

  onSubmit() {

    this.orderService.saveOrder(this.totalPrice, this.ingredients, this.user).subscribe(
      responseData => {
        this.router.navigate(['/orders']);
        localStorage.removeItem('orderData');
        localStorage.removeItem('price');
        localStorage.removeItem('data');
        localStorage.removeItem('orderItem');
      },
      errorMessage => {
        console.log(errorMessage);
      }
    );
  }
}
