import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesPage } from './recipes.page';

const routes: Routes = [
  { path: '', component: RecipesPage },
  { path: 'new', loadChildren: () => import('./recipe-form/recipe-form.module').then( m => m.RecipeFormPageModule) },
  { path: ':id', loadChildren: () => import('./recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesPageRoutingModule {}
