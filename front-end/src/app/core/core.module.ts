import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {ResponseHandleInterceptor} from './interceptors/response-handle.interceptor';
import {ToastrService} from 'ngx-toastr';
import {Store} from '@ngrx/store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        NgbActiveModal,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseHandleInterceptor,
            multi: true,
            deps: [ToastrService, Store]
        }
    ]
})
export class CoreModule {
}
