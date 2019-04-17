import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllQueriesComponent} from './all-queries/all-queries.component';
import {CreateQueryComponent} from './create-query/create-query.component';
import {QueryDetailsComponent} from './query-details/query-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {RouterModule} from '@angular/router';
import {AnswersModule} from '../answers/answers.module';
import {SharedModule} from '../shared/shared.module';
import { UserQueriesComponent } from './user-queries/user-queries.component';
import { EditQueryComponent } from './edit-query/edit-query.component';
import { QueryTaggedComponent } from './query-tagged/query-tagged.component';
import {QueryRoutingModule} from './query-routing.module';
import {QuillModule} from 'ngx-quill';
import {CeilPipe} from '../../core/pipes/ceil.pipe';

@NgModule({
    declarations: [
        AllQueriesComponent,
        CreateQueryComponent,
        QueryDetailsComponent,
        UserQueriesComponent,
        EditQueryComponent,
        QueryTaggedComponent,
        CeilPipe
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        CKEditorModule,
        QueryRoutingModule,
        AnswersModule,
        QuillModule
    ],
    exports: [
        AllQueriesComponent,
        CreateQueryComponent,
        QueryDetailsComponent,
        UserQueriesComponent,
        EditQueryComponent,
        QueryTaggedComponent,
        CeilPipe
    ]
})
export class QueriesModule {
}
