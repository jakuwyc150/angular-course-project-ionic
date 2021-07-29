import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export const recipeReducer = createReducer(
  initialState,

  on(RecipeActions.setRecipes, (state, { recipes }) => ({
    ...state, recipes
  }))
);
