import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromRoot from '../../store/app.reducer';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list-form',
  templateUrl: './shopping-list-form.page.html',
  styleUrls: ['./shopping-list-form.page.scss'],
})
export class ShoppingListFormPage implements OnInit, OnDestroy {
  editedIngredientData: fromShoppingList.IngredientEditData = null;
  dirty = false;
  pageTitle = 'Add Ingredient';
  ingredientForm: FormGroup;
  submitButtonLabel = 'Add Ingredient';

  ingredientsStateSubscription: Subscription;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit() {
    this.ingredientsStateSubscription = this.store.select('shoppingList').pipe(
      map(shoppingListState => shoppingListState.editData)
    ).subscribe(ingredientEditData => {
      if (ingredientEditData.editing === true) {
        this.dirty = true;
        this.pageTitle = 'Edit Ingredient';
        this.editedIngredientData = ingredientEditData;
        this.submitButtonLabel = 'Save';

        this.initForm(ingredientEditData.editedIngredient);
      } else {
        this.initForm(null);
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(ShoppingListActions.finishEdit());

    if (this.ingredientsStateSubscription) {
      this.ingredientsStateSubscription.unsubscribe();
    }
  }

  clearForm() {
    this.ingredientForm.reset();
    this.ingredientForm.patchValue({
      ingredientAmount: 0
    });

    this.dirty = false;
  }

  formSubmit() {
    if (this.editedIngredientData) {
      const updatedIngredient = { ...this.editedIngredientData.editedIngredient };

      updatedIngredient.name = this.ingredientForm.value.ingredientName;
      updatedIngredient.amount = this.ingredientForm.value.ingredientAmount;

      this.store.dispatch(ShoppingListActions.updateIngredient({
        index: this.editedIngredientData.editedIndex,
        newIngredient: updatedIngredient,
      }));

      this.router.navigate(['/shopping-list']);
      this.showAlert('Ingredient updated!');
    } else {
      this.store.dispatch(ShoppingListActions.addIngredient({
        newIngredient: new Ingredient(
          this.ingredientForm.value.ingredientName,
          this.ingredientForm.value.ingredientAmount
        )
      }));

      this.router.navigate(['/shopping-list']);
      this.showAlert('New ingredient added!');
    }
  }

  async removeEditedIngredient() {
    const alert = await this.alertController.create({
      buttons: [
        {
          text: 'Cancel'
        },

        {
          text: 'OK',
          handler: () => {
            this.store.dispatch(ShoppingListActions.removeEditedIngredient());
            this.router.navigate(['/shopping-list']);
          }
        }
      ],

      backdropDismiss: false,
      header: 'Confirm',
      message: 'Are you sure you would like to remove this ingredient from shopping list?'
    });

    await alert.present();
  }

  private initForm(ingredient: Ingredient) {
    this.ingredientForm = this.formBuilder.group({
      ingredientName: [ingredient ? ingredient.name : '', [
        Validators.required,
        Validators.minLength(3)
      ]],

      ingredientAmount: [ingredient ? ingredient.amount : 0, [
        Validators.required,
        Validators.min(0)
      ]]
    });

    this.ingredientForm.valueChanges.subscribe(value => {
      this.dirty = value.ingredientName !== '' || value.ingredientAmount !== 0;
    });
  }

  private async showAlert(message: string) {
    const alert = await this.alertController.create({
      backdropDismiss: true,
      buttons: ['OK'],
      header: 'Info',
      message
    });

    await alert.present();
  }
}
