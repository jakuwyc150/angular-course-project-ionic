import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const fetchRecipes = createAction('[RECIPES] FETCH_RECIPES');
export const addRecipe = createAction('[RECIPES] ADD_RECIPE', props<{ newRecipe: Recipe }>());
export const setRecipes = createAction('[RECIPES] SET_RECIPES', props<{ recipes: Recipe[] }>());
