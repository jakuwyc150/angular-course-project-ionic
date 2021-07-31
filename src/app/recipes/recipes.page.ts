import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as fromRoot from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes$: Observable<Recipe[]>;

  constructor(
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {}

  addRecipe() {
    this.router.navigate(['/recipes/recipe-form']);
  }

  editRecipe(recipeIndex: number) {
    this.recipes$.pipe(
      take(1)
    ).subscribe(recipes => {
      this.store.dispatch(RecipeActions.startEdit({
        editedIndex: recipeIndex,
        editedRecipe: recipes[recipeIndex]
      }));

      this.router.navigate(['/recipes/recipe-form']);
    });
  }

  ngOnInit() {
    this.recipes$ = this.store.select('recipes').pipe(
      map(state => state.recipes)
    );
  }

  navigateToRecipeDetails(recipeIndex: number) {
    this.recipes$.pipe(
      take(1),
    ).subscribe(recipes => {
      const selectedRecipe = recipes[recipeIndex];

      this.store.dispatch(RecipeActions.selectDetails({ selectedRecipe }));
      this.router.navigate(['/recipes/details']);
    });
  }
}
