import { createReducer, on } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  editData: IngredientEditData;
  ingredients: Ingredient[];
};

const initialState: State = {
  editData: {
    editing: false,
    editedIndex: -1,
    editedIngredient: null
  },

  ingredients: []
};

export interface IngredientEditData {
  editing: boolean;
  editedIndex: number;
  editedIngredient: Ingredient;
}

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
  }),

  on(ShoppingListActions.finishEdit, (state): State => ({
    ...state,

    editData: {
      editing: false,
      editedIndex: -1,
      editedIngredient: null
    }
  })),

  on(ShoppingListActions.removeEditedIngredient, (state): State => ({
    ...state,
    ingredients: state.ingredients.filter(ingredient => ingredient !== state.editData.editedIngredient)
  })),

  on(ShoppingListActions.startEdit, (state, { editedIndex, editedIngredient }): State => ({
    ...state,

    editData: {
      editedIngredient, editedIndex,
      editing: true
    }
  })),

  on(ShoppingListActions.updateIngredient, (state, { index, newIngredient }): State => {
    const newIngredients = [ ...state.ingredients ];
    newIngredients.splice(index,  1, newIngredient);

    return {
      ...state,
      ingredients: newIngredients
    };
  })
);

const addOrCombine = (array: Ingredient[], newIngredient: Ingredient) => {
  const ingredientIndex = array.findIndex(ingredient => ingredient.name === newIngredient.name);

  if (ingredientIndex > -1) {
    const currentAmount = array[ingredientIndex].amount;
    array.splice(ingredientIndex, 1, new Ingredient(newIngredient.name, currentAmount + newIngredient.amount));
  } else {
    array.push(newIngredient);
  }
};
