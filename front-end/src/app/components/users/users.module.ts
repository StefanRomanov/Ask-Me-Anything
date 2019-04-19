import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {SharedModule} from '../shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';
import {SelectRoleFormComponent} from './select-role-form/select-role-form.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [UserListComponent, SelectRoleFormComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        NgbDropdownModule
    ],
    exports: [
        UserListComponent,
        SelectRoleFormComponent
    ]
})
export class UsersModule {
}
