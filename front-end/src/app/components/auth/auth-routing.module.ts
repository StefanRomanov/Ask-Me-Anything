import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {RegisterFormComponent} from './register-form/register-form.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {AnonymousGuard} from '../../core/guards/anonymous.guard';

const appAuthRouting: Route[] = [
    {path: 'register', component: RegisterFormComponent, canActivate: [AnonymousGuard] },
    {path: 'login', component: LoginFormComponent, canActivate: [AnonymousGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(appAuthRouting)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {  }
