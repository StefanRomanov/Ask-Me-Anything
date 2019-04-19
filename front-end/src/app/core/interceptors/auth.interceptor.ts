import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getAuthToken} from '../../+store';
import {take} from 'rxjs/operators';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<any>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(getAuthToken)
            .pipe(
                take(1),
                switchMap(token => {
                        let authHeader;

                        if (token && token.length) {
                            authHeader = {Authorization: `Bearer ${token}`};
                        } else {
                            authHeader = {};
                        }

                        req = req.clone({
                            setHeaders: {
                                Accept: 'application/json',
                                ...authHeader
                            }
                        });
                        return next.handle(req);
                    }
                )
            );
    }
}
