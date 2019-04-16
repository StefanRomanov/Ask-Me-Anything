import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './core/interceptors/auth.interceptor';
import {SharedModule} from './components/shared/shared.module';
import { LandingComponent } from './components/landing/landing.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './core/services/auth.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ResponseHandleInterceptor} from './core/interceptors/response-handle.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuillModule} from 'ngx-quill';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        QuillModule.forRoot(),
        ToastrModule.forRoot(),
        BrowserAnimationsModule
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
