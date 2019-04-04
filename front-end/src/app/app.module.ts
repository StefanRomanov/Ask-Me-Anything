import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AllQueriesComponent} from './components/all-queries/all-queries.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './services/interceptors/auth.interceptor';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        AllQueriesComponent,
        RegisterFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
