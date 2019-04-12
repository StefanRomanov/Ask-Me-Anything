import {Component, OnInit} from '@angular/core';
import {QueryService} from '../query.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import Query from '../../models/Query';

@Component({
    selector: 'app-all-queries',
    templateUrl: './all-queries.component.html',
    styleUrls: ['./all-queries.component.css']
})
export class AllQueriesComponent implements OnInit{

    queries$: Observable<Query[]>;
    title = 'All queries';
    searchString = '';
    orderString: string;

    constructor(private queryService: QueryService) {
    }

    ngOnInit() {
        this.queries$ = this.queryService.getAllQueries(this.searchString, 'popular')
            .pipe(
                map(e => e.queries)
            );
    }

    search(data: string) {
        this.searchString = data;
        this.title = 'All queries containing "' + data + '"';
        this.queries$ = this.queryService.getAllQueries(this.searchString, this.orderString)
            .pipe(
                map(e => e.queries)
            );
    }

    order(order: string) {
        this.orderString = order;
        this.queries$ = this.queryService.getAllQueries(this.searchString, this.orderString)
            .pipe(
                map(e => e.queries)
            );
    }
}
