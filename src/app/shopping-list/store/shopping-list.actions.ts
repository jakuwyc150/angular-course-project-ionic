import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const addIngredient = createAction('[SHOPPING LIST] ADD_SINGLE_INGREDIENT', props<{ newIngredient: Ingredient }>());
export const addIngredients = createAction('[SHOPPING LIST] ADD_MULTIPLE_INGREDIENTS', props<{ newIngredients: Ingredient[] }>());
export const finishEdit = createAction('[SHOPPING LIST] FINISH_EDIT');
export const startEdit = createAction('[SHOPPING LIST] START_EDIT', props<{ editedIndex: number; editedIngredient: Ingredient }>());
export const updateIngredient = createAction('[SHOPPING LIST] UPDATE_INGREDIENT', props<{ index: number; newIngredient: Ingredient }>());
