import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesPage } from './recipes.page';

const routes: Routes = [
  { path: '', component: RecipesPage },
  { path: 'recipe-form', loadChildren: () => import('./recipe-form/recipe-form.module').then( m => m.RecipeFormPageModule) },
  { path: 'details', loadChildren: () => import('./recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesPageRoutingModule {}
