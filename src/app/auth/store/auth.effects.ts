/* eslint-disable */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

const handleAuthentication = (expiresIn: number, email: string, userID: string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const newUser = new User(token, expirationDate, email, userID);

  localStorage.setItem('userData', JSON.stringify(newUser));

  return AuthActions.authSuccess({
    email, expirationDate, token, userID,
    redirect: true
  });
}

const handleError = (errorResponse: any) => {
  let errorMessage = 'An unknown error occured!';

  if (!errorResponse.error || !errorResponse.error.error) {
    return of(AuthActions.authFail({ authError: errorMessage }));
  }

  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS': {
      errorMessage = 'This email address exists already!';
      break;
    }

    case 'EMAIL_NOT_FOUND': {
      errorMessage = 'This email address does not exist!';
      break;
    }

    case 'INVALID_PASSWORD': {
      errorMessage = 'This password is not correct!';
      break;
    }
  }

  return of(AuthActions.authFail({ authError: errorMessage }));
}

@Injectable()
export class AuthEffects {
  loginStart$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginStart),

    switchMap((loginStartAction) => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseKey, {
        email: loginStartAction.email,
        password: loginStartAction.password,
        returnSecureToken: true
      }).pipe(
        map(resData => {
          return handleAuthentication(Number(resData.expiresIn), resData.email, resData.localId, resData.idToken);
        }),

        catchError(errorResponse => {
          return handleError(errorResponse);
        })
      );
    })
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),

    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/auth-form']);
    })
  ), {
    dispatch: false
  });

  redirect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authSuccess),

    tap((authSuccessAction) => {
      if (authSuccessAction.redirect === true) {
        this.router.navigate(['/']);
      }
    })
  ), {
    dispatch: false
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
