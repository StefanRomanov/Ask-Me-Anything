import {UserContext} from '../../core/models/UserContext';

export const getToken = (state: UserContext) => state.token;
export const getUserId = (state: UserContext) => state.userId;
export const getUsername = (state: UserContext) => state.username;
export const getIsLoggedIn = (state: UserContext) => state.isLoggedIn;
export const getIsAdmin = (state: UserContext) => state.role === 'ADMIN' || state.role === 'ROOT';
