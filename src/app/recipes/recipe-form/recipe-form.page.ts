import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import * as fromRoot from '../../store/app.reducer';
import * as fromRecipes from '../store/recipe.reducer';
import * as RecipeActions from '../store/recipe.actions';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.page.html',
  styleUrls: ['./recipe-form.page.scss'],
})
export class RecipeFormPage implements OnInit, OnDestroy {
  editedRecipeData: fromRecipes.RecipeEditData = null;
  dirty = false;
  pageTitle = 'Add Recipe';
  recipeForm: FormGroup;
  submitButtonLabel = 'Add Recipe';

  private recipesStateSubscription: Subscription;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {}

  get recipeIngredients() {
    return this.recipeForm.controls.recipeIngredients as FormArray;
  }

  addIngredient(ingredient: Ingredient) {
    const ingredientForm = this.formBuilder.group({
      ingredientName: [ingredient ? ingredient.name : '', [
        Validators.required,
        Validators.minLength(3)
      ]],

      ingredientAmount: [ingredient ? ingredient.amount : 0, [
        Validators.required,
        Validators.min(0)
      ]]
    });

    this.recipeIngredients.push(ingredientForm);
  }

  clearForm() {
    this.recipeForm.reset();
    this.dirty = false;
  }

  ngOnInit() {
    this.recipesStateSubscription = this.store.select('recipes').pipe(
      map(recipeState => recipeState.editData)
    ).subscribe(recipeEditData => {
      if (recipeEditData.editing === true) {
        this.dirty = true;
        this.pageTitle = 'Edit Recipe';
        this.editedRecipeData = recipeEditData;
        this.submitButtonLabel = 'Save';

        this.initForm(recipeEditData.editedRecipe);

        recipeEditData.editedRecipe.ingredients.forEach(ingredient => {
          this.addIngredient(ingredient);
        });
      } else {
        this.initForm(null);
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(RecipeActions.finishEdit());

    if (this.recipesStateSubscription) {
      this.recipesStateSubscription.unsubscribe();
    }
  }

  formSubmit() {
    if (this.editedRecipeData) {
      const updatedRecipe = { ...this.editedRecipeData.editedRecipe };

      updatedRecipe.name = this.recipeForm.value.recipeName;
      updatedRecipe.description = this.recipeForm.value.recipeDescription;
      updatedRecipe.imagePath = this.recipeForm.value.recipeImageURL;

      updatedRecipe.ingredients = this.recipeForm.value.recipeIngredients.map(formValue => new Ingredient(
        formValue.ingredientName,
        formValue.ingredientAmount
      ));

      this.store.dispatch(RecipeActions.updateRecipe({
        index: this.editedRecipeData.editedIndex,
        newRecipe: updatedRecipe
      }));

      this.router.navigate(['/recipes']);
      this.showAlert('Recipe updated!');
    } else {
      this.store.dispatch(RecipeActions.addRecipe({
        newRecipe: new Recipe(
          this.recipeForm.value.recipeName,
          this.recipeForm.value.recipeDescription,
          this.recipeForm.value.recipeImageURL,

          this.recipeForm.value.recipeIngredients.map(formValue => new Ingredient(
            formValue.ingredientName,
            formValue.ingredientAmount
          ))
        )
      }));

      this.router.navigate(['/recipes']);
      this.showAlert('New recipe added!');
    }
  }

  removeIngredient(index: number) {
    this.recipeIngredients.removeAt(index);
  }

  private initForm(recipe: Recipe) {
    this.recipeForm = this.formBuilder.group({
      recipeName: [recipe ? recipe.name : '', [
        Validators.required,
        Validators.minLength(3)
      ]],

      recipeDescription: [recipe ? recipe.description : '', [
        Validators.required,
        Validators.minLength(5)
      ]],

      recipeImageURL: [recipe ? recipe.imagePath : '', [
        Validators.required,
        Validators.pattern('http(s)?:\/\/[^\n]*')
      ]],

      recipeIngredients: this.formBuilder.array([])
    });

    this.recipeForm.valueChanges.subscribe(value => {
      this.dirty = value.recipeName !== '' || value.recipeDescription !== '' || value.recipeImageURL !== '';
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
