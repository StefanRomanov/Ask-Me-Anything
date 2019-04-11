import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {QueryService} from '../query.service';
import Query from '../../models/Query';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-query-list',
    templateUrl: './query-list.component.html',
    styleUrls: ['./query-list.component.css']
})
export class QueryListComponent implements OnInit {

    @Input()
    queries: Query[];

    constructor(private queryService: QueryService) {
    }

    ngOnInit() {
    }
}
