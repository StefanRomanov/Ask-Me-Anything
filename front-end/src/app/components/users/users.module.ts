import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectRoleFormComponent} from './select-role-form/select-role-form.component';

@NgModule({
    declarations: [UserListComponent, SelectRoleFormComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],
    exports: [
        UserListComponent,
        SelectRoleFormComponent
    ]
})
export class UsersModule {
}
