import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {QueriesModule} from './queries/queries.module';
import {AnswersModule} from './answers/answers.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import { LandingComponent } from './landing/landing.component';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        QueriesModule,
        HttpClientModule,
        AnswersModule,
        AuthModule,
        SharedModule
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
