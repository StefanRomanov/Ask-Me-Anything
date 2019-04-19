import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {AuthService} from './services/auth.service';
import {ResponseHandleInterceptor} from './interceptors/response-handle.interceptor';
import {ToastrService} from 'ngx-toastr';

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
            deps: [AuthService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseHandleInterceptor,
            multi: true,
            deps: [ToastrService, AuthService]
        }
    ]
})
export class CoreModule {
}
