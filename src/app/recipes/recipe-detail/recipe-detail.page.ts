import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromRoot from '../../store/app.reducer';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  selectedRecipe$: Observable<Recipe>;

  constructor(
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit() {
    this.selectedRecipe$ = this.store.select('recipes').pipe(
      map(recipesState => recipesState.selectedDetails)
    );
  }
}
