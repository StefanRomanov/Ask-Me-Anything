import {Action} from '@ngrx/store';
import {UserContext} from '../../core/models/UserContext';


export const ActionTypes = {
    Register: '[AUTH] Register',
    RegisterSuccess: '[AUTH] Register Success',
    RegisterFailed: '[AUTH] Register Failed',

    Login: '[AUTH] Login',
    LoginSuccess: '[AUTH] Login Success',
    LoginFailed: '[AUTH] Login Failed',

    Logout: '[AUTH] Logout',

    SetUserContext: '[AUTH] Set User Context',
    ResetUserContext: '[AUTH] Reset User Context',

    DecodeToken: '[AUTH] Decode Token'
};

export class Register implements Action {
    type = ActionTypes.Register;
    constructor(public payload: { username: string, email: string, password: string }) { }
}

export class RegisterSuccess implements Action {
    type = ActionTypes.RegisterSuccess;
    constructor(public payload: {message: string}) { }
}

export class RegisterFailed implements Action {
    type = ActionTypes.RegisterFailed;
    constructor(public payload: { error: any }) { }
}

export class Login implements Action {
    type = ActionTypes.Login;
    constructor(public payload: { username: string, password: string }) { }
}

export class LoginSuccess implements Action {
    type = ActionTypes.LoginSuccess;
    constructor(public payload: {message: string, token: string}) { }
}

export class LoginFailed implements Action {
    type = ActionTypes.LoginFailed;
    constructor(public payload: { error: any }) { }
}

export class Logout implements Action {
    type = ActionTypes.Logout;
    constructor(public payload: null = null) { }
}

export class SetUserContext implements Action {
    type = ActionTypes.SetUserContext;
    constructor(public payload: UserContext) { }
}

export class ResetUserContext implements Action {
    type = ActionTypes.ResetUserContext;
    constructor(public payload: null = null) { }
}

export class DecodeToken implements Action {
    type = ActionTypes.DecodeToken;
    constructor(public payload: {token: string}) { }
}

export type Actions = Register |
    RegisterSuccess |
    RegisterFailed |
    Login |
    LoginSuccess | Logout |
    LoginFailed | SetUserContext |
    ResetUserContext| DecodeToken;
