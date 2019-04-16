import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnswerCardComponent} from './answer-card/answer-card.component';
import {AnswerCreateFormComponent} from './answer-create-form/answer-create-form.component';
import {AnswerListComponent} from './answer-list/answer-list.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { EditAnswerComponent } from './edit-answer/edit-answer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        AnswerCardComponent,
        AnswerCreateFormComponent,
        AnswerListComponent,
        EditAnswerComponent
    ],
    imports: [
        NgbModule,
        CommonModule,
        CKEditorModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule
    ],
    exports: [
        AnswerCardComponent,
        AnswerCreateFormComponent,
        AnswerListComponent,
        EditAnswerComponent
    ],
    entryComponents: [
        EditAnswerComponent
    ]
})
export class AnswersModule {
}
