import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../shared/ingredient.model';
import * as fromRoot from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  ingredients$: Observable<Ingredient[]>;

  constructor(
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit() {
    this.ingredients$ = this.store.select('shoppingList').pipe(
      map(shoppingListState => shoppingListState.ingredients)
    );
  }
}
