import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';
import * as fromRoot from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  selectedRecipe$: Observable<Recipe>;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit() {
    this.selectedRecipe$ = this.store.select('recipes').pipe(
      map(recipesState => recipesState.selectedDetails)
    );
  }

  async removeRecipe() {
    const alert = await this.alertController.create({
      buttons: [
        {
          text: 'Cancel'
        },

        {
          text: 'OK',
          handler: () => {
            this.store.dispatch(RecipeActions.removeSelectedRecipe());
            this.router.navigate(['/recipes']);
          }
        }
      ],

      backdropDismiss: true,
      header: 'Confirm',
      message: 'Are you sure you would like to remove this recipe?'
    });

    await alert.present();
  }

  addIngredientsToShoppingList() {
    this.selectedRecipe$.pipe(
      take(1)
    ).subscribe(async (recipe) => {
      this.store.dispatch(ShoppingListActions.addIngredients({
        newIngredients: recipe.ingredients
      }));

      const alert = await this.alertController.create({
        buttons: [
          {
            text: 'Shopping list',
            handler: () => {
              this.router.navigate(['/shopping-list']);
            }
          },

          {
            text: 'OK'
          }
        ],

        backdropDismiss: true,
        header: 'Info',
        message: 'Added ingredients to shopping list successfully!'
      });

      await alert.present();
    });
  }
}
