import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  authError: string;
  loading: boolean;
  user: User;
}

const initialState: State = {
  authError: null,
  loading: false,
  user: null
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.authFail, (state, { authError }): State => ({
    ...state, authError,

    loading: false,
    user: null
  })),

  on(AuthActions.authSuccess, (state, { email, userID, token, expirationDate, redirect }): State => ({
    ...state,

    authError: null,
    user: new User(token, expirationDate, email, userID)
  })),

  on(AuthActions.loginStart, (state, { email, password }): State => ({
    ...state,

    authError: null,
    loading: true
  })),

  on(AuthActions.logout, (state): State => ({
    ...state,

    authError: null,
    loading: false,
    user: null
  }))
);
