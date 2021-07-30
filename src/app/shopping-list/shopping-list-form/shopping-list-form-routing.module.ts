import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListFormPage } from './shopping-list-form.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListFormPageRoutingModule {}
