import {Component, OnInit} from '@angular/core';
import {QueryService} from '../query.service';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import Query from '../../core/models/Query';

@Component({
    selector: 'app-all-queries',
    templateUrl: './all-queries.component.html',
    styleUrls: ['./all-queries.component.css']
})
export class AllQueriesComponent implements OnInit {

    queries$: Subject<Query[]> = this.queryService.queryListSubject;
    title = 'All queries';
    searchString = '';
    orderString: string;
    tag = '';

    constructor(private queryService: QueryService) {
    }

    ngOnInit() {
        this.queryService.getAllQueries(this.searchString, 'popular', this.tag)
    }

    search(data: string) {
        this.searchString = data;
        this.title = 'All queries containing "' + data + '"';
        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag);
    }

    order(order: string) {
        this.orderString = order;
        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag);
    }
}
