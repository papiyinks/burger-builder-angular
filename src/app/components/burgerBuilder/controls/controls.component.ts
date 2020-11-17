import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

import { IngredientState } from '../../utils';
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  @Input() state: IngredientState;
  @Output() updateStateOutputCallback: EventEmitter<any> = new EventEmitter<any>();
  controlsIngredients: object;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    this.controlsIngredients = Object.keys( this.state.ingredients )
      .map( ingredientName => ingredientName )
      .reduce((prev, current) => {
        return prev.concat(current);
      }, []);

  }

  addIngredient(ingredient: string ) {
    const oldCount = this.state.ingredients[ingredient];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[ingredient] = updatedCount;
    const priceAddition = this.state.ingredientsPrice[ingredient];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.state.totalPrice = newPrice;
    this.state.ingredients = updatedIngredients;
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredient( ingredient: string ) {
    const oldCount = this.state.ingredients[ingredient];
    if ( oldCount <= 0 ) {
        return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[ingredient] = updatedCount;
    const priceDeduction = this.state.ingredientsPrice[ingredient];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.state.totalPrice = newPrice;
    this.state.ingredients = updatedIngredients;
    this.updatePurchaseState(updatedIngredients);
  }

  updatePurchaseState(ingredients: { [x: string]: any; }) {
    const sum = Object.keys( ingredients )
      .map( ingredientKey => {
          return ingredients[ingredientKey];
      })
      .reduce( ( sum, el ) => {
          return sum + el;
      }, 0 );
    this.state.purchasable = sum > 0;
    this.updateStateOutputCallback.emit({'state': this.state});
  }


}
