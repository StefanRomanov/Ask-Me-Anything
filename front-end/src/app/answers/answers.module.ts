import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnswerCardComponent} from './answer-card/answer-card.component';
import {AnswerCreateFormComponent} from './answer-create-form/answer-create-form.component';
import {AnswerListComponent} from './answer-list/answer-list.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        AnswerCardComponent,
        AnswerCreateFormComponent,
        AnswerListComponent
    ],
    imports: [
        CommonModule,
        CKEditorModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        AnswerCardComponent,
        AnswerCreateFormComponent,
        AnswerListComponent
    ],
})
export class AnswersModule {
}
