import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {CreateQueryComponent} from './create-query/create-query.component';
import {UserQueriesComponent} from './user-queries/user-queries.component';
import {QueryDetailsComponent} from './query-details/query-details.component';
import {AllQueriesComponent} from './all-queries/all-queries.component';
import {EditQueryComponent} from './edit-query/edit-query.component';
import {QueryTaggedComponent} from './query-tagged/query-tagged.component';
import {AuthGuard} from '../../core/guards/auth.guard';

const appQueryRouting: Route[] = [
    {path: 'create', component: CreateQueryComponent, canActivate: [AuthGuard]},
    {path: 'my', component: UserQueriesComponent, canActivate: [AuthGuard]},
    {path: 'details/:id', component: QueryDetailsComponent, runGuardsAndResolvers: 'always'},
    {path: 'all', component: AllQueriesComponent},
    {path: 'edit/:id', component: EditQueryComponent, canActivate: [AuthGuard]},
    {path: 'tagged/:tag', component: QueryTaggedComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(appQueryRouting)
    ],
    exports: [
        RouterModule
    ]
})
export class QueryRoutingModule {  }
