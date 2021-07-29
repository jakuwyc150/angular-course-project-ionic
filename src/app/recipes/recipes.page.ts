import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromRoot from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes$: Observable<Recipe[]>;

  constructor(private store: Store<fromRoot.AppState>) {}

  ngOnInit() {
    this.recipes$ = this.store.select('recipes').pipe(
      map(state => {
        return state.recipes;
      })
    );
  }
}
