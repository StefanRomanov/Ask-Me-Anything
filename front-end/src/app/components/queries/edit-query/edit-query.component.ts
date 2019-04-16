import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../../../core/services/query.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Query from '../../../core/models/Query';
import {Subject, Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-query',
    templateUrl: './edit-query.component.html',
    styleUrls: ['./edit-query.component.css']
})
export class EditQueryComponent implements OnInit, OnDestroy {

    id: string;
    querySubject: Subject<Query> = this.queryService.querySubject;
    query: Query = this.queryService.query;
    form: FormGroup;
    tagsArray: string[];

    subscription$: Subscription;
    editSubscription$: Subscription;

    public editor = ClassicEditor;

    constructor(private formBuilder: FormBuilder,
                private queryService: QueryService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.params.id;

        this.queryService.getQuery(this.id);
        this.form = this.formBuilder.group({
            title: [this.query.title, [Validators.required, Validators.pattern('[A-Za-z0-9]{1,25}')]],
            description: [this.query.description, Validators.required],
            tags: [this.query.tags.join(' '), Validators.pattern('[0-9a-zA-Z]+( [0-9a-zA-Z]+)*')]
        });
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }

        if (this.editSubscription$) {
            this.editSubscription$.unsubscribe();
        }
    }

    submitForm() {
        this.tagsArray = Array.from(new Set(this.tags.value.split(' ')));

        this.queryService.editQuery(this.query.id, {
            title: this.title.value,
            description: this.description.value,
            tags: this.tagsArray
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
