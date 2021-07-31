import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  editData: RecipeEditData;
  recipes: Recipe[];
  selectedDetails: Recipe;
}

const initialState: State = {
  editData: { editing: false, editedIndex: -1, editedRecipe: null },
  recipes: [],
  selectedDetails: null
};

export interface RecipeEditData {
  editing: boolean;
  editedIndex: number;
  editedRecipe: Recipe;
}

export const recipeReducer = createReducer(
  initialState,

  on(RecipeActions.addRecipe, (state, { newRecipe }): State => ({
    ...state,

    recipes: [ ...state.recipes, newRecipe ]
  })),

  on(RecipeActions.finishEdit, (state): State => ({
    ...state,

    editData: {
      editing: false,
      editedIndex: -1,
      editedRecipe: null
    }
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
  })),

  on(RecipeActions.startEdit, (state, { editedRecipe, editedIndex }): State => ({
    ...state,

    editData: {
      editedRecipe, editedIndex,
      editing: true
    }
  })),

  on(RecipeActions.updateRecipe, (state, { index, newRecipe }): State => {
    const newRecipes = [ ...state.recipes ];
    newRecipes.splice(index, 1, newRecipe);

    return {
      ...state,

      recipes: newRecipes
    };
  })
);
