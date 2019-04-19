import {UserContext} from '../../core/models/UserContext';
import { ActionTypes, Actions, SetUserContext } from './actions';


const initialUserContext: UserContext = {
    userId: null,
    username: null,
    token: null,
    role: null,
    isLoggedIn: false
};

export function reducer(state = initialUserContext, action: Actions): UserContext {
    switch (action.type) {

        case ActionTypes.SetUserContext: {
            const data = (action as SetUserContext).payload;
            return { ...state, ...data };
        }

        case ActionTypes.ResetUserContext: {
            return { ...state, ...initialUserContext };
        }
    }

    return state;
}
