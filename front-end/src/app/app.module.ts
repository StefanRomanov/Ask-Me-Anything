import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AllQueriesComponent} from './components/all-queries/all-queries.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './services/interceptors/auth.interceptor';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateQueryComponent } from './components/create-query/create-query.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { InputTextComponent } from './components/input-text/input-text.component';
import { QueryDetailsComponent } from './components/query-details/query-details.component';
import { QueryListComponent } from './components/query-list/query-list.component';
import { QueryCardComponent } from './components/query-card/query-card.component';
import { AnswerCreateFormComponent } from './components/answer-create-form/answer-create-form.component';

@NgModule({
    declarations: [
        AppComponent,
        AllQueriesComponent,
        RegisterFormComponent,
        LoginFormComponent,
        NavigationComponent,
        FooterComponent,
        CreateQueryComponent,
        InputTextComponent,
        QueryDetailsComponent,
        QueryListComponent,
        QueryCardComponent,
        AnswerCreateFormComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        CKEditorModule
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
