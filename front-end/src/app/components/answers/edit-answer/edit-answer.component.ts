import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {AnswerService} from '../../../core/services/answer.service';
import Answer from '../../../core/models/Answer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css']
})
export class EditAnswerComponent implements OnInit {

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
            content: [this.answer.content, Validators.required]
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
        this.closeModal();
        this.answerService.editAnswer({content: this.content.value}, this.answer.id);
    }

    get content() {
        return this.answerEditForm.controls.content;
    }

    closeModal() {
        this.activeModal.close('Modal Closed');
    }

}
