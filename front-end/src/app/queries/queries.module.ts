import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllQueriesComponent} from './all-queries/all-queries.component';
import {CreateQueryComponent} from './create-query/create-query.component';
import {QueryCardComponent} from './query-card/query-card.component';
import {QueryDetailsComponent} from './query-details/query-details.component';
import {QueryListComponent} from './query-list/query-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {RouterModule} from '@angular/router';
import {AnswersModule} from '../answers/answers.module';

@NgModule({
    declarations: [
        AllQueriesComponent,
        CreateQueryComponent,
        QueryCardComponent,
        QueryDetailsComponent,
        QueryListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CKEditorModule,
        RouterModule,
        AnswersModule
    ],
    exports: [
        AllQueriesComponent,
        CreateQueryComponent,
        QueryCardComponent,
        QueryDetailsComponent,
        QueryListComponent
    ]
})
export class QueriesModule {
}
