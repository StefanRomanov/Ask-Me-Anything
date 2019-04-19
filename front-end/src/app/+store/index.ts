import { createFeatureSelector, createSelector} from '@ngrx/store';
import { reducer as authReducer} from './auth/reducer';
import * as auth from './auth/selectors';
import {UserContext} from '../core/models/UserContext';

export const reducers = {
    auth: authReducer,
};

export interface IAppState {
    auth: UserContext;
}

/* Auth Selectors */

export const getAuthStore = createFeatureSelector('auth');
export const getAuthUsername = createSelector(getAuthStore, auth.getUsername);
export const getAuthUserId = createSelector(getAuthStore, auth.getUserId);
export const getAuthToken = createSelector(getAuthStore, auth.getToken);
export const getAuthIsLoggedIn = createSelector(getAuthStore, auth.getIsLoggedIn);
export const getAuthIsAdmin = createSelector(getAuthStore, auth.getIsAdmin);
