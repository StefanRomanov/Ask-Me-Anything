import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnswerService} from '../../../core/services/answer.service';
import constants from '../../../util/constants';

@Component({
    selector: 'app-answer-create-form',
    templateUrl: './answer-create-form.component.html',
    styleUrls: ['./answer-create-form.component.css']
})
export class AnswerCreateFormComponent implements OnInit {

    modules: object;
    answerForm: FormGroup;

    @Input()
    queryId: string;

    constructor(private formBuilder: FormBuilder, private answerService: AnswerService) {
    }

    ngOnInit() {
        this.answerForm = this.formBuilder.group({
            content: ['', [ Validators.required]]
        });

        this.modules = constants.ANSWER_EDITOR_MODULES;
    }

    submitForm() {
        this.answerService.createAnswer({content: this.content.value, queryId: this.queryId}, this.answerForm);
    }

    get content() {
        return this.answerForm.controls.content;
    }

}
