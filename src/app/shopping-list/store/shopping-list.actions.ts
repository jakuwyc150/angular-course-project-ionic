import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const addIngredient = createAction('[SHOPPING LIST] ADD_INGREDIENT', props<{ ingredient: Ingredient }>());
