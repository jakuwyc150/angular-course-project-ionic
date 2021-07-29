import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  isManageShown = false;

  constructor(
    private menuController: MenuController,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit() {}

  hideSubmenus() {
    this.isManageShown = false;
  }

  navigateToRecipes() {
    this.router.navigate(['/recipes']);
    this.menuController.close('menu-sidebar');
  }

  onFetchDataClicked() {
    this.store.dispatch(RecipeActions.fetchRecipes());
  }

  toggleManage() {
    this.isManageShown = !this.isManageShown;
  }
}
