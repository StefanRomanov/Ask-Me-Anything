import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

    form: FormGroup;

    @Output()
    searchEmitter = new EventEmitter<object>();

    constructor(private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            search: [''],
            tag: ['']
        });
    }

    submitSearch() {
        this.searchEmitter.emit({search: this.search.value, tag: this.tag.value});
    }

    get search() {
        return this.form.controls.search;
    }

    get tag() {
        return this.form.controls.tag;
    }

}
