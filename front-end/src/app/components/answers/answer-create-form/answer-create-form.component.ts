import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnswerService} from '../../../core/services/answer.service';

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
            content: ['', Validators.required]
        });

        this.modules = {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'align': [] }],

                ['clean'],                                         // remove formatting button

                ['link', 'image']                         // link and image, video
            ]
        };
    }

    submitForm() {
        this.answerService.createAnswer({content: this.content.value, queryId: this.queryId}, this.answerForm);
    }

    get content() {
        return this.answerForm.controls.content;
    }

}
