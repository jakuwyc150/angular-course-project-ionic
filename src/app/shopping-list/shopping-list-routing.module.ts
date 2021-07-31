import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListPage } from './shopping-list.page';

const routes: Routes = [
  { path: '', component: ShoppingListPage },
  { path: 'form', loadChildren: () => import('./shopping-list-form/shopping-list-form.module').then( m => m.ShoppingListFormPageModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListPageRoutingModule {}
