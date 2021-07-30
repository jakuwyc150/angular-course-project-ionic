import { createAction, props } from '@ngrx/store';

export const authFail = createAction('[AUTH] AUTH_FAIL', props<{ authError: string }>());
export const loginStart = createAction('[AUTH] LOGIN_START', props<{ email: string; password: string }>());
export const logout = createAction('[AUTH] LOGOUT');

export const authSuccess = createAction(
  '[AUTH] AUTH_SUCCESS',
  props<{
    email: string;
    userID: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);
