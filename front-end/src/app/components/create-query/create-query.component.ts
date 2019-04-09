import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../../services/query.service';

@Component({
    selector: 'app-create-query',
    templateUrl: './create-query.component.html',
    styleUrls: ['./create-query.component.css']
})
export class CreateQueryComponent implements OnInit {
    public editor = ClassicEditor;
    form: FormGroup;
    tagsArray: string[];
    constructor(private formBuilder: FormBuilder, private queryService: QueryService ) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]{1,25}')]],
            description: ['', Validators.required],
            tags: ['', Validators.pattern('[0-9a-zA-Z]+( [0-9a-zA-Z]+)*')]
        });
    }

    submitForm() {
        this.tagsArray = this.tags.value.split(' ');

        this.queryService.createQuery({
            title: this.title.value,
            description: this.description.value,
            tags: this.tagsArray,
            username: 'aaaa'
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
