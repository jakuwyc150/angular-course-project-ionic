import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  isManageShown = false;

  constructor(private store: Store<fromRoot.AppState>) {}

  ngOnInit() {}

  hideSubmenus() {
    this.isManageShown = false;
  }

  onFetchDataClicked() {
    this.store.dispatch(RecipeActions.fetchRecipes());
  }

  toggleManage() {
    this.isManageShown = !this.isManageShown;
  }
}
