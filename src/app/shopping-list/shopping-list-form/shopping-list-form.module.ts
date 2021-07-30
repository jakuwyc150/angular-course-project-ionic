import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingListFormPageRoutingModule } from './shopping-list-form-routing.module';

import { ShoppingListFormPage } from './shopping-list-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingListFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ShoppingListFormPage]
})
export class ShoppingListFormPageModule {}
