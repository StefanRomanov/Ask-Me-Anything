import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Observable, Subject} from 'rxjs';
import Query from '../../../core/models/Query';
import {QueryService} from '../../../core/services/query.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-user-queries',
    templateUrl: './user-queries.component.html',
    styleUrls: ['./user-queries.component.css']
})
export class UserQueriesComponent implements OnInit, OnDestroy {

    title = `Queries of user "${this.authService.getUsername()}"`;
    queries$: Subject<Query[]> = this.queryService.queryListSubject;
    totalNumber: Subject<number> = this.queryService.queryCount;
    searchString = '';
    orderString = 'popular';
    page = 1;
    tag = '';

    constructor(private authService: AuthService, private queryService: QueryService) {
    }

    ngOnInit() {
        this.queryService.getByUserIdAndTitle(this.authService.getUserId(), this.searchString, this.orderString, this.tag, this.page);
    }

    search(data) {
        this.searchString = data.search;
        this.tag = data.tag;
        this.queryService.getByUserIdAndTitle(this.authService.getUserId(), this.searchString, this.orderString, this.tag, this.page);
    }

    order(order) {
        this.orderString = order;
        this.queryService.getByUserIdAndTitle(this.authService.getUserId(), this.searchString, this.orderString, this.tag, this.page);
    }

    pageChange(page: number) {
        this.page = page;
        console.log(page);
        this.queryService.getByUserIdAndTitle(this.authService.getUserId(), this.searchString, this.orderString, this.tag, this.page);
    }

    ngOnDestroy(): void {
        this.queryService.destroySubscriptions();
    }

}
