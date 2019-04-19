import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    ActionTypes,
    DecodeToken,
    Login,
    LoginFailed,
    LoginSuccess,
    Register,
    RegisterSuccess,
    ResetUserContext,
    SetUserContext
} from './actions';
import {AuthService} from 'src/app/core/services/auth.service';
import {switchMap, map, catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import decode from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private toastrService: ToastrService
    ) {
    }

    @Effect() init$ = this.actions$.pipe(ofType('@ngrx/effects/init'), switchMap(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            return [new ResetUserContext()];
        }
        return [new DecodeToken({token})];
    }));

    @Effect() decode$ = this.actions$.pipe(
        ofType<DecodeToken>(ActionTypes.DecodeToken),
        map(action => action.payload),
        switchMap(data => {
            const {token} = data;

            if (token === null) {
                return [new ResetUserContext()];
            } else {
                try {
                    const decoded = decode(token);
                    return [new SetUserContext({
                        isLoggedIn: true,
                        token,
                        ...decoded
                    })];

                } catch (e) {
                    return [new ResetUserContext()];
                }
            }
        })
    );

    @Effect() login$ = this.actions$.pipe(
        ofType<Login>(ActionTypes.Login),
        map(action => action.payload),
        switchMap(data => {
            const {username, password} = data;
            return this.authService.login(username, password).pipe(
                switchMap(({message, token}) => {
                    return [new LoginSuccess({message, token}), ];
                }),
                catchError((err) => [new LoginFailed({error: err.message})])
            );
        })
    );

    @Effect() register$ = this.actions$.pipe(
        ofType<Register>(ActionTypes.Register),
        map(action => action.payload),
        switchMap(data => {
            const {username, email , password} = data;
            return this.authService.register(username, email , password).pipe(
                switchMap((result) => {
                    return [new RegisterSuccess({message: result['message']})];
                }),
                tap(message => {
                    this.toastrService.success(message.payload.message);
                    this.router.navigate(['auth', 'login']);
                }),
                catchError((err) => [new LoginFailed({error: err.message})])
            );
        })
    );

    @Effect() loginSuccess$ = this.actions$.pipe(
        ofType<LoginSuccess>(ActionTypes.LoginSuccess),
        map(action => action.payload),
        switchMap(data => {
            const {message, token} = data;
            this.toastrService.success(message);
            window.localStorage.setItem('auth_token', token);
            this.router.navigate(['']);
            return [new DecodeToken({token})];
        })
    );

    @Effect() logout$ = this.actions$.pipe(
        ofType(ActionTypes.Logout),
        switchMap(() => [new ResetUserContext()]),
        tap(() => {
            window.localStorage.clear();
            this.toastrService.success('Successful logout');
            this.router.navigate(['home']);
        }),
        catchError((error) => [new LoginFailed({error})])
    );
}
