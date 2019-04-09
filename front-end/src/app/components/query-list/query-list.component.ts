import {Component, OnDestroy, OnInit} from '@angular/core';
import {QueryService} from '../../services/query.service';
import Query from '../../models/Query';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-query-list',
    templateUrl: './query-list.component.html',
    styleUrls: ['./query-list.component.css']
})
export class QueryListComponent implements OnInit, OnDestroy {
    queries: Query[];
    subscription$: Subscription;

    constructor(private queryService: QueryService) {
    }

    ngOnInit() {
        this.subscription$ = this.queryService.getAllQueries()
            .subscribe(data => {
                console.log(data);
                this.queries = data.queries;
            });
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

}
