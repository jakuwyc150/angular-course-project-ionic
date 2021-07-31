import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const addIngredient = createAction('[SHOPPING LIST] ADD_SINGLE_INGREDIENT', props<{ newIngredient: Ingredient }>());
export const addIngredients = createAction('[SHOPPING LIST] ADD_MULTIPLE_INGREDIENTS', props<{ newIngredients: Ingredient[] }>());
