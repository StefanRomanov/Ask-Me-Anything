import {Component, OnInit} from '@angular/core';
import {QueryService} from '../../../core/services/query.service';
import {Observable, Subscription} from 'rxjs';
import Query from '../../../core/models/Query';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
    selector: 'app-all-queries',
    templateUrl: './all-queries.component.html',
    styleUrls: ['./all-queries.component.css']
})
export class AllQueriesComponent implements OnInit, OnDestroy {

    queries$: Observable<Query[]>;
    totalNumber: Observable<number>;

    routeSubscription: Subscription;
    title: string;
    searchString = '';
    page = 1;
    orderString = 'popular';
    tag = '';
    user: string;

    constructor(private activatedRoute: ActivatedRoute,
                private queryService: QueryService,
                private router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.routeSubscription = this.activatedRoute.params
            .subscribe(data => {
                this.tag = data.tag || '';

                if (this.tag === '') {
                    this.title = 'All queries';
                } else {
                    this.title = `Queries tagged: ${this.tag}`;
                }

                if (this.router.url.includes('my')) {
                    this.title = `Queries posted by "${this.authService.getUsername()}"`;
                    this.user = this.authService.getUserId();
                } else {
                    this.user = null;
                }

                this.queryService.getAllQueries(this.searchString, this.orderString, this.tag, this.page, this.user);

                this.queries$ = this.queryService.getQueryListObservable();
                this.totalNumber = this.queryService.getCountObservable();
            });
    }

    search(data) {
        this.searchString = data.search;
        if (!this.router.url.includes('tagged')) {
            this.tag = data.tag;
        }

        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag, this.page, this.user);
    }

    order(order: string) {
        this.orderString = order;

        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag, this.page, this.user);
    }

    pageChange(page: number) {
        this.page = page;
        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag, this.page, this.user);
    }

    ngOnDestroy(): void {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }

        this.queryService.destroySubscriptions();
    }
}
