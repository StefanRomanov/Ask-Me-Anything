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
export class AllQueriesComponent implements OnInit {

    queries$: Observable<Query[]>;
    title = 'All queries';

    constructor(private queryService: QueryService) {
    }

    ngOnInit() {
        this.queries$ = this.queryService.getAllQueries()
            .pipe(
                map( e => e.queries)
            );
    }

}
