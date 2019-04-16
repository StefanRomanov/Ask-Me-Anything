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

    public editor = ClassicEditor;
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
