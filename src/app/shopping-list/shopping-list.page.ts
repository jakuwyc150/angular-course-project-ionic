import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as fromRoot from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];

  private shoppingListStateSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.shoppingListStateSubscription = this.store.select('shoppingList').subscribe(shoppingListState => {
      this.ingredients = shoppingListState.ingredients;
    });
  }

  ngOnDestroy() {
    if (this.shoppingListStateSubscription) {
      this.shoppingListStateSubscription.unsubscribe();
    }
  }

  addIngredient() {
    this.router.navigate(['/shopping-list/form']);
  }

  editIngredient(ingredientIndex: number) {
    this.store.dispatch(ShoppingListActions.startEdit({
      editedIndex: ingredientIndex,
      editedIngredient: this.ingredients[ingredientIndex]
    }));

    this.router.navigate(['/shopping-list/form']);
  }
}
