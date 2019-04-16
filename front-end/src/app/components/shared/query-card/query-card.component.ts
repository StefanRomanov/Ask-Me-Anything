import {Component, Input, OnInit} from '@angular/core';
import Query from '../../../core/models/Query';

@Component({
    selector: 'app-query-card',
    templateUrl: './query-card.component.html',
    styleUrls: ['./query-card.component.css']
})
export class QueryCardComponent implements OnInit {

    @Input()
    query: Query;

    constructor() {
    }

    ngOnInit() {
    }

}
