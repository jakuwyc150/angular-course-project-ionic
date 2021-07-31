import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import * as fromRoot from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { map } from 'rxjs/operators';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  loggedUser$: Observable<User>;
  isManageShown = false;

  constructor(
    private alertController: AlertController,
    private menuController: MenuController,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit() {
    this.loggedUser$ = this.store.select('auth').pipe(
      map(authState => authState.user)
    );
  }

  hideSubmenus() {
    this.isManageShown = false;
  }

  navigateToAuthForm() {
    this.router.navigate(['/auth-form']);
    this.menuController.close('menu-sidebar');
  }

  navigateToRecipes() {
    this.router.navigate(['/recipes']);
    this.menuController.close('menu-sidebar');
  }

  navigateToShoppingList() {
    this.router.navigate(['/shopping-list']);
    this.menuController.close('menu-sidebar');
  }

  onFetchDataClicked() {
    this.store.dispatch(RecipeActions.fetchRecipes());
    this.menuController.close('menu-sidebar');
  }

  async onSaveDataClicked() {
    this.menuController.close('menu-sidebar');

    const alert = await this.alertController.create({
      buttons: [
        {
          text: 'Cancel'
        },

        {
          text: 'OK',
          handler: () => {
            this.store.dispatch(RecipeActions.saveRecipes());
          }
        }
      ],

      backdropDismiss: false,
      header: 'Confirm',
      message: 'Are you sure you would like to save all data?'
    });

    await alert.present();
  }

  onLogoutClicked() {
    this.store.dispatch(AuthActions.logout());
    this.menuController.close('menu-sidebar');
  }

  toggleManage() {
    this.isManageShown = !this.isManageShown;
  }
}
