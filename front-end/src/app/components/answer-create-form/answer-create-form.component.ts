import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {AnswerService} from '../../services/answer.service';

@Component({
    selector: 'app-answer-create-form',
    templateUrl: './answer-create-form.component.html',
    styleUrls: ['./answer-create-form.component.css']
})
export class AnswerCreateFormComponent implements OnInit {

    public editor = ClassicEditor;
    answerForm: FormGroup;

    @Input()
    queryId: string;

    constructor(private formBuilder: FormBuilder, private answerService: AnswerService) {
    }

    ngOnInit() {
        this.answerForm = this.formBuilder.group({
            content: ['', Validators.required]
        });
    }

    submitForm() {
        this.answerService.createQuery({content: this.content.value, queryId: this.queryId});
    }

    get content() {
        return this.answerForm.controls.content;
    }

}
