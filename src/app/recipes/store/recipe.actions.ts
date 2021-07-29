import { createAction, props } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const FETCH_RECIPES = "[RECIPES] FETCH_RECIPES";
export const ADD_RECIPE = "[RECIPES] ADD_RECIPE"
export const SET_RECIPES = "[RECIPES] SET_RECIPES";

export const fetchRecipes = createAction(FETCH_RECIPES);
export const addRecipe = createAction(ADD_RECIPE, props<{ newRecipe: Recipe }>());
export const setRecipes = createAction(SET_RECIPES, props<{ recipes: Recipe[] }>());
