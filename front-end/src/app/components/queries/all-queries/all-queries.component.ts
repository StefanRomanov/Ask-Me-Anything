import {Component, OnInit} from '@angular/core';
import {QueryService} from '../../../core/services/query.service';
import {Observable, Subject} from 'rxjs';
import Query from '../../../core/models/Query';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-all-queries',
    templateUrl: './all-queries.component.html',
    styleUrls: ['./all-queries.component.css']
})
export class AllQueriesComponent implements OnInit, OnDestroy {

    queries$: Subject<Query[]> = this.queryService.queryListSubject;
    totalNumber: Subject<number> = this.queryService.queryCount;
    title = 'All queries';
    searchString = '';
    page = 1;
    orderString = 'popular';
    tag = '';

    constructor(private queryService: QueryService) {
    }

    ngOnInit() {
        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag, this.page);
    }

    search(data) {
        this.searchString = data.search;
        this.tag = data.tag;
        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag, this.page);
    }

    order(order: string) {
        this.orderString = order;
        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag, this.page);
    }

    pageChange(page: number) {
        this.page = page;
        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag, this.page);
    }

    ngOnDestroy(): void {
        this.queryService.destroySubscriptions();
    }
}
