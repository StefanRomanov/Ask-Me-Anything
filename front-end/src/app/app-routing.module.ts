import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: LandingComponent},
    {
        path: 'auth', loadChildren: './components/auth/auth.module#AuthModule'
    },
    {
        path: 'query', loadChildren: './components/queries/queries.module#QueriesModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
