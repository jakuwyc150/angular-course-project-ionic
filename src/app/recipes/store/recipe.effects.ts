/* eslint-disable */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as fromRoot from '../../store/app.reducer';
import * as RecipeActions from './recipe.actions';
import { AlertController } from '@ionic/angular';

@Injectable()
export class RecipeEffects {
  fetchRecipes$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.fetchRecipes),

    switchMap(() => {
      return this.http.get<Recipe[]>('https://angular-course-project-db-default-rtdb.europe-west1.firebasedatabase.app/recipes.json').pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),

        map(recipes => {
          return RecipeActions.setRecipes({ recipes });
        })
      );
    })
  ));

  saveRecipes$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.saveRecipes),
    withLatestFrom(this.store.select('recipes')),
    map(([_, recipesState]) => recipesState.recipes),

    switchMap(recipes => {
      return this.http.put('https://angular-course-project-db-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes);
    }),

    tap(async () => {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        buttons: ['OK'],
        header: 'Info',
        message: 'All data have been saved!'
      });

      await alert.present();
    })
  ), {
    dispatch: false
  });

  constructor(
    private actions$: Actions,
    private alertController: AlertController,
    private http: HttpClient,
    private store: Store<fromRoot.AppState>
  ) {}
}
