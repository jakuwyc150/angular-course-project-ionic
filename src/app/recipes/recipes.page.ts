import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromRoot from '../store/app.reducer';
import { Router } from '@angular/router';

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

  ngOnInit() {
    this.recipes$ = this.store.select('recipes').pipe(
      map(state => state.recipes)
    );
  }

  navigateToRecipeForm() {
    this.router.navigate(['/recipes/new']);
  }
}
