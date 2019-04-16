import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

export class AuthInterceptor implements HttpInterceptor {

    constructor(private authServce: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authServce.getToken();
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
}
