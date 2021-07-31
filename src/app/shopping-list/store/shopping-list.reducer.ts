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
    addOrCombine(newIngredients, newIngredient);

    return {
      ...state,
      ingredients: newIngredients
    };
  }),

  on(ShoppingListActions.addIngredients, (state, { newIngredients }): State => {
    const newIngredientsArray = [ ...state.ingredients ];
    newIngredients.forEach(ingredient => addOrCombine(newIngredientsArray, ingredient));

    return {
      ...state,
      ingredients: newIngredientsArray
    };
  })
);

const addOrCombine = <T> (array: Ingredient[], newIngredient: Ingredient) => {
  const ingredientIndex = array.findIndex(ingredient => ingredient.name === newIngredient.name);

  if (ingredientIndex > -1) {
    const currentAmount = array[ingredientIndex].amount;
    array.splice(ingredientIndex, 1, new Ingredient(newIngredient.name, currentAmount + newIngredient.amount));
  } else {
    array.push(newIngredient);
  }
};
