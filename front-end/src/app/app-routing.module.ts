import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {CreateQueryComponent} from './components/create-query/create-query.component';
import {QueryDetailsComponent} from './components/query-details/query-details.component';
import {QueryListComponent} from './components/query-list/query-list.component';

const routes: Routes = [
    {path: 'register', component: RegisterFormComponent},
    {path: 'login', component: LoginFormComponent},
    {path: 'query/create', component: CreateQueryComponent},
    {path: 'query/details/:id', component: QueryDetailsComponent},
    {path: 'query/all', component: QueryListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
