import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.page.html',
  styleUrls: ['./recipe-form.page.scss'],
})
export class RecipeFormPage implements OnInit {
  dirty = false;
  pageTitle: string = 'Add Recipe';
  recipeForm: FormGroup;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {}

  private initForm() {
    this.recipeForm = this.formBuilder.group({
      recipeName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      recipeDescription: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],

      recipeImageURL: ['', [
        Validators.required,
        Validators.pattern("http(s)?:\/\/[^\n]*")
      ]]
    });

    this.recipeForm.valueChanges.subscribe(value => {
      this.dirty = value.recipeName !== '' || value.recipeDescription !== '' || value.recipeImageURL !== ''
    });
  }

  clearForm() {
    this.recipeForm.reset();
    this.dirty = false;
  }

  ngOnInit() {
    this.initForm();
  }

  async formSubmit() {
    this.store.dispatch(RecipeActions.addRecipe({
      newRecipe: new Recipe(
        this.recipeForm.value.recipeName,
        this.recipeForm.value.recipeDescription,
        this.recipeForm.value.recipeImageURL,
        []
      )
    }));

    const alert = await this.alertController.create({
      buttons: [{
        text: "OK",
        handler: () => {
          this.router.navigate(['/recipes']);
        }
      }],

      backdropDismiss: false,
      header: "Info",
      message: "New recipe added!"
    });

    await alert.present();
  }
}
