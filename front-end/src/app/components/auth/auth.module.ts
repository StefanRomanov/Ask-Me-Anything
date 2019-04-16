import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from './login-form/login-form.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
    declarations: [
        LoginFormComponent,
        RegisterFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        AuthRoutingModule
    ],
    exports: [
        LoginFormComponent,
        RegisterFormComponent
    ]
})
export class AuthModule {
}
