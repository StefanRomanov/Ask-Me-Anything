import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

    form: FormGroup;

    @Output()
    searchEmitter = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            search: ['']
        });
    }

    submitSearch() {
        this.searchEmitter.emit(this.search.value);
    }

    get search() {
        return this.form.controls.search;
    }

}
