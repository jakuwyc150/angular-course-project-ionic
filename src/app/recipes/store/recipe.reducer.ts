import { createReducer, on } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
  selectedDetails: Recipe;
}

const initialState: State = {
  recipes: [],
  selectedDetails: null
};

export const recipeReducer = createReducer(
  initialState,

  on(RecipeActions.addRecipe, (state, { newRecipe }): State => ({
    ...state,

    recipes: [ ...state.recipes, newRecipe ]
  })),

  on(RecipeActions.removeSelectedRecipe, (state): State => ({
    ...state,

    recipes: state.recipes.filter(recipe => recipe !== state.selectedDetails),
    selectedDetails: null
  })),

  on(RecipeActions.selectDetails, (state, { selectedRecipe }): State => ({
    ...state,

    selectedDetails: selectedRecipe
  })),

  on(RecipeActions.setRecipes, (state, { recipes }): State => ({
    ...state, recipes
  }))
);
