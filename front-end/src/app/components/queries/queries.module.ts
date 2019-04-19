import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllQueriesComponent} from './all-queries/all-queries.component';
import {CreateQueryComponent} from './create-query/create-query.component';
import {QueryDetailsComponent} from './query-details/query-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {AnswersModule} from '../answers/answers.module';
import {SharedModule} from '../shared/shared.module';
import { EditQueryComponent } from './edit-query/edit-query.component';
import {QueryRoutingModule} from './query-routing.module';
import {QuillModule} from 'ngx-quill';

@NgModule({
    declarations: [
        AllQueriesComponent,
        CreateQueryComponent,
        QueryDetailsComponent,
        EditQueryComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        CKEditorModule,
        QuillModule,
        QueryRoutingModule,
        AnswersModule,
        QuillModule
    ],
    exports: [
        AllQueriesComponent,
        CreateQueryComponent,
        QueryDetailsComponent,
        EditQueryComponent,
    ]
})
export class QueriesModule {
}
