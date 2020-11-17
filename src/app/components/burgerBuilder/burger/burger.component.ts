import { Component, OnInit } from '@angular/core';

import { IngredientState } from '../../utils';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css']
})
export class BurgerComponent implements OnInit {


  state: IngredientState = {
    ingredients: null,
    ingredientsPrice: null,
    totalPrice: 4,
    purchasable: false
  };
  addedIngredients: any;

  constructor() {
  }

  ngOnInit(): void {
    this.state.ingredients = {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    };
    this.state.ingredientsPrice = {
      salad: 0.5,
      meat: 0.3,
      cheese: 0.6,
      bacon: 1.0
    };

    this.getAddedIngredients();
  }

  getAddedIngredients() {
    this.addedIngredients = Object.keys( this.state.ingredients )
      .map( ingredientName => {
          return [...Array( this.state.ingredients[ingredientName] )].map( ( v, i ) => {
              return ingredientName;
          } );
        } )
        .reduce((prev, current) => {
          return prev.concat(current);
        }, []);
    localStorage.setItem('data', JSON.stringify(this.addedIngredients));
      }

  updateStateOutputCallback(event: { state: IngredientState; }) {
    this.state = event.state;
    this.getAddedIngredients();
  }
}
