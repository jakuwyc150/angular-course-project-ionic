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

  on(ShoppingListActions.addIngredient, (state, { newIngredient }): State => {
    const newIngredients = [ ...state.ingredients ];
    const existingIngredientIndex = newIngredients.findIndex(ingredient => ingredient.name === newIngredient.name);

    if (existingIngredientIndex > -1) {
      const currentAmount = newIngredients[existingIngredientIndex].amount;
      newIngredients.splice(existingIngredientIndex, 1, new Ingredient(newIngredient.name, currentAmount + newIngredient.amount));
    } else {
      newIngredients.push(newIngredient);
    }

    return {
      ...state,
      ingredients: newIngredients
    };
  })
);
