import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import Query from '../../../core/models/Query';
import {ActivatedRoute} from '@angular/router';
import {QueryService} from '../../../core/services/query.service';

@Component({
    selector: 'app-query-tagged',
    templateUrl: './query-tagged.component.html',
    styleUrls: ['./query-tagged.component.css']
})
export class QueryTaggedComponent implements OnInit, OnDestroy {

    queries$: Subject<Query[]> = this.queryService.queryListSubject;
    totalNumber: Subject<number> = this.queryService.queryCount;
    title: string;
    searchString = '';
    page = 1;
    orderString = 'popular';
    tag = '';

    constructor(private activatedRoute: ActivatedRoute, private queryService: QueryService) {
    }

    ngOnInit() {
        this.tag = this.activatedRoute.snapshot.params.tag;
        this.title = `Queries tagged: ${this.tag}`;

        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag, this.page);
    }

    search(data: string) {
        this.searchString = data;

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
