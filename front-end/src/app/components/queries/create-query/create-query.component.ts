import {Component, OnInit, ViewChild} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../../../core/services/query.service';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {QuillEditorComponent} from 'ngx-quill';

@Component({
    selector: 'app-create-query',
    templateUrl: './create-query.component.html',
    styleUrls: ['./create-query.component.css']
})
export class CreateQueryComponent implements OnInit {
    modules: object;
    form: FormGroup;
    tagsArray: string[];

    constructor(
        private formBuilder: FormBuilder,
        private queryService: QueryService,
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: ['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]{1,50}')]],
            description: ['', [Validators.required, Validators.maxLength(2000)]],
            tags: ['', [Validators.pattern('[0-9a-zA-Z]+( [0-9a-zA-Z]+)*'), Validators.required]]
        });
        this.modules = {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean'],                                         // remove formatting button

                ['link', 'image']                         // link and image, video
            ]
        };
    }

    submitForm() {
        this.tagsArray = Array.from(new Set(this.tags.value.split(' ')));
        const userId = this.authService.getUserId();
        console.log(userId);

        this.queryService.createQuery({
            title: this.title.value,
            description: this.description.value,
            tags: this.tagsArray,
            userId
        });
    }

    get title() {
        return this.form.controls.title;
    }

    get description() {
        return this.form.controls.description;
    }

    get tags() {
        return this.form.controls.tags;
    }
}
