import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../query.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Query from '../../models/Query';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-query',
    templateUrl: './edit-query.component.html',
    styleUrls: ['./edit-query.component.css']
})
export class EditQueryComponent implements OnInit, OnDestroy {

    id: string;
    query: Query;
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

        this.subscription$ = this.queryService.getQuery(this.id)
            .subscribe(response => {
                this.query = response.query;
                this.form = this.formBuilder.group({
                    title: [this.query.title, [Validators.required, Validators.pattern('[A-Za-z0-9]{1,25}')]],
                    description: [this.query.description, Validators.required],
                    tags: [this.query.tags.join(' '), Validators.pattern('[0-9a-zA-Z]+( [0-9a-zA-Z]+)*')]
                });
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

        this.editSubscription$ = this.queryService.editQuery(this.query.id, {
            title: this.title.value,
            description: this.description.value,
            tags: this.tagsArray
        })
            .subscribe(result => {
                this.router.navigate(['query', 'details', this.query.id]);
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
