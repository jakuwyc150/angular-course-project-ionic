import { createReducer, on } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
};

const initialState: State = {
  ingredients: []
};

export const shoppingListReducer = createReducer(
  initialState,

  on(ShoppingListActions.addIngredient, (state, { ingredient }): State => ({
    ...state,

    ingredients: [ ...state.ingredients, ingredient ]
  }))
);
