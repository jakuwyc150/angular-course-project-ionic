import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'auth-form', loadChildren: () => import('./auth/auth-form/auth-form.module').then( m => m.AuthFormPageModule) },
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then( m => m.RecipesPageModule), canLoad: [AuthGuard] },
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then( m => m.ShoppingListPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
