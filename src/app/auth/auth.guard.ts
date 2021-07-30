/* eslint-disable */

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromRoot from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select('auth').pipe(
      take(1),

      map(authState => authState.user),

      map(user => {
        const isAuthed: boolean = !!user; // Converts truish object to true (or falsy to false).

        if (isAuthed === true) {
          return true;
        } else {
          return this.router.createUrlTree(['/auth-form']);
        }
      })
    );
  }
}
