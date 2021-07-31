import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {
  recipes: Recipe[] = [];

  private recipesStateSubscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {}

  addRecipe() {
    this.router.navigate(['/recipes/recipe-form']);
  }

  editRecipe(recipeIndex: number) {
    this.store.dispatch(RecipeActions.startEdit({
      editedIndex: recipeIndex,
      editedRecipe: this.recipes[recipeIndex]
    }));

    this.router.navigate(['/recipes/recipe-form']);
  }

  ngOnInit() {
    this.recipesStateSubscription = this.store.select('recipes').subscribe(recipesState => {
      this.recipes = recipesState.recipes;
    });
  }

  ngOnDestroy() {
    if (this.recipesStateSubscription) {
      this.recipesStateSubscription.unsubscribe();
    }
  }

  navigateToRecipeDetails(recipeIndex: number) {
    const selectedRecipe = this.recipes[recipeIndex];

    this.store.dispatch(RecipeActions.selectDetails({ selectedRecipe }));
    this.router.navigate(['/recipes/details']);
  }
}
