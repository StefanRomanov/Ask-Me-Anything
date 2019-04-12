import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterFormComponent} from './auth/register-form/register-form.component';
import {LoginFormComponent} from './auth/login-form/login-form.component';
import {CreateQueryComponent} from './queries/create-query/create-query.component';
import {QueryDetailsComponent} from './queries/query-details/query-details.component';
import {LandingComponent} from './landing/landing.component';
import {AllQueriesComponent} from './queries/all-queries/all-queries.component';
import {UserQueriesComponent} from './queries/user-queries/user-queries.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: LandingComponent},
    {path: 'register', component: RegisterFormComponent},
    {path: 'login', component: LoginFormComponent},
    {path: 'query/create', component: CreateQueryComponent},
    {path: 'query/my', component: UserQueriesComponent},
    {path: 'query/details/:id', component: QueryDetailsComponent},
    {path: 'query/all', component: AllQueriesComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
