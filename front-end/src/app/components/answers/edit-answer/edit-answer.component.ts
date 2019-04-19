import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnswerService} from '../../../core/services/answer.service';
import Answer from '../../../core/models/Answer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import constants from '../../../util/constants';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css']
})
export class EditAnswerComponent implements OnInit, OnDestroy {

    modules: object;
    answerEditForm: FormGroup;

    @Input()
    answer: Answer;

    @Input()
    queryId: string;

    constructor(private formBuilder: FormBuilder,
                private answerService: AnswerService,
                private activeModal: NgbActiveModal) {
    }

    ngOnInit() {
        this.answerEditForm = this.formBuilder.group({
            content: [this.answer.content, [Validators.required]]
        });

        this.modules = constants.ANSWER_EDITOR_MODULES;
    }

    submitForm() {
        this.closeModal();
        this.answerService.editAnswer({content: this.content.value}, this.answer.id);
    }

    get content() {
        return this.answerEditForm.controls.content;
    }

    closeModal() {
        this.activeModal.dismiss();
    }

    ngOnDestroy(): void {
        this.answerService.destroySubscriptions();
    }

}
