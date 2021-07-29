import { ActionReducerMap } from "@ngrx/store";
import * as fromRecipes from "../recipes/store/recipe.reducer";

export interface AppState {
  recipes: fromRecipes.State
}

export const appReducer: ActionReducerMap<AppState> = {
  recipes: fromRecipes.recipeReducer
}
