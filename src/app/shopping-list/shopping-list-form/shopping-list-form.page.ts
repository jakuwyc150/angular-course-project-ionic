import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as fromRoot from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list-form',
  templateUrl: './shopping-list-form.page.html',
  styleUrls: ['./shopping-list-form.page.scss'],
})
export class ShoppingListFormPage implements OnInit {
  dirty = false;
  pageTitle = 'Add Ingredient';
  ingredientForm: FormGroup;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit() {
    this.initForm();
  }

  clearForm() {
    this.ingredientForm.reset();
    this.ingredientForm.patchValue({
      ingredientAmount: 0
    });

    this.dirty = false;
  }

  async formSubmit() {
    this.store.dispatch(ShoppingListActions.addIngredient({
      newIngredient: new Ingredient(
        this.ingredientForm.value.ingredientName,
        this.ingredientForm.value.ingredientAmount
      )
    }));

    const alert = await this.alertController.create({
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/shopping-list']);
        }
      }],

      backdropDismiss: false,
      header: 'Info',
      message: 'New ingredient added!'
    });

    await alert.present();
  }

  private initForm() {
    this.ingredientForm = this.formBuilder.group({
      ingredientName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      ingredientAmount: [0, [
        Validators.required,
        Validators.min(0)
      ]]
    });

    this.ingredientForm.valueChanges.subscribe(value => {
      this.dirty = value.ingredientName !== '' || value.ingredientAmount !== 0;
    });
  }
}
