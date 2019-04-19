import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../../../core/services/query.service';
import {ActivatedRoute} from '@angular/router';
import Query from '../../../core/models/Query';
import {Observable, Subscription} from 'rxjs';
import constants from '../../../util/constants';

@Component({
    selector: 'app-edit-query',
    templateUrl: './edit-query.component.html',
    styleUrls: ['./edit-query.component.css']
})
export class EditQueryComponent implements OnInit, OnDestroy {

    id: string;
    modules: object;
    querySubject: Observable<Query>;
    query: Query = this.queryService.query;
    form: FormGroup;
    tagsArray: string[];

    subscription$: Subscription;
    editSubscription$: Subscription;

    constructor(private formBuilder: FormBuilder,
                private queryService: QueryService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.params.id;
        this.queryService.getQuery(this.id);

        this.querySubject = this.queryService.getQueryObservable();

        this.form = this.formBuilder.group({
            title: [this.query.title, [Validators.required, Validators.pattern('[A-Za-z0-9 ]{10,50}')]],
            description: [this.query.description, [Validators.required]],
            tags: [this.query.tags.join(' '), Validators.pattern('[0-9a-zA-Z]+( [0-9a-zA-Z]+)*')]
        });

        this.modules = constants.QUERY_EDITOR_MODULES;
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
