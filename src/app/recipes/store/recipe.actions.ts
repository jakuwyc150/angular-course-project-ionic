import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const addRecipe = createAction('[RECIPES] ADD_RECIPE', props<{ newRecipe: Recipe }>());
export const fetchRecipes = createAction('[RECIPES] FETCH_RECIPES');
export const finishEdit = createAction('[RECIPES] FINISH_EDIT');
export const removeSelectedRecipe = createAction('[RECIPES] REMOVE_SELECTED_RECIPE');
export const saveRecipes = createAction('[RECIPES] SAVE_RECIPES');
export const selectDetails = createAction('[RECIPES] SELECT_DETAILS', props<{ selectedRecipe: Recipe }>());
export const setRecipes = createAction('[RECIPES] SET_RECIPES', props<{ recipes: Recipe[] }>());
export const startEdit = createAction('[RECIPES] START_EDIT', props<{ editedRecipe: Recipe; editedIndex: number }>());
export const updateRecipe = createAction('[RECIPES] UPDATE_RECIPE', props<{ index: number; newRecipe: Recipe }>());
