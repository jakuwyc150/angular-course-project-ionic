import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.page.html',
  styleUrls: ['./recipe-form.page.scss'],
})
export class RecipeFormPage implements OnInit {
  dirty = false;
  pageTitle: string = 'Add Recipe';
  recipeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
}
