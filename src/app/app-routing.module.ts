import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes', canActivate: [AuthGuard], loadChildren: () => import('./recipes/recipes.module').then( m => m.RecipesPageModule) },
  { path: 'auth-form', loadChildren: () => import('./auth/auth-form/auth-form.module').then( m => m.AuthFormPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
