import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../../../core/services/query.service';
import constants from '../../../util/constants';
import {Store} from '@ngrx/store';
import {getAuthUserId} from '../../../+store';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-create-query',
    templateUrl: './create-query.component.html',
    styleUrls: ['./create-query.component.css']
})
export class CreateQueryComponent implements OnInit {
    modules: object;
    form: FormGroup;
    tagsArray: string[];
    userId: string;

    constructor(
        private formBuilder: FormBuilder,
        private queryService: QueryService,
        private store: Store<any>) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: ['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]{10,50}')]],
            description: ['', [Validators.required]],
            tags: ['', [Validators.pattern('[0-9a-zA-Z]+( [0-9a-zA-Z]+)*'), Validators.required]]
        });

        this.modules = constants.QUERY_EDITOR_MODULES;
    }

    submitForm() {

        this.tagsArray = Array.from(new Set(this.tags.value.toLowerCase().split(' ')));
        this.store.select(getAuthUserId)
            .pipe(
                take(1)
            )
            .subscribe(userId => {
                this.queryService.createQuery({
                    title: this.title.value,
                    description: this.description.value,
                    tags: this.tagsArray,
                    userId
                });
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
