import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Store} from '@ngrx/store';
import {Logout} from '../../+store/auth/actions';

@Injectable({
    providedIn: 'root'
})
export class ResponseHandleInterceptor implements HttpInterceptor {
    constructor(private toastrService: ToastrService, private store: Store<any>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(tap((success) => {
                if (success instanceof HttpResponse) {
                    if (success.url.endsWith('create')
                        || success.url.includes('delete')
                        || success.url.includes('edit')) {
                        this.toastrService.success(success.body.message);
                    }
                }

            }), catchError(error => {
                if (error.status === 410) {
                    this.store.dispatch(new Logout());
                }
                this.toastrService.error(error.error.message);
                throw error;
            }));
    }
}
