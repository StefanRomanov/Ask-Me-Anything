import {Component, OnDestroy, OnInit} from '@angular/core';
import Query from '../../../core/models/Query';
import {QueryService} from '../../../core/services/query.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {getAuthIsAdmin, getAuthIsLoggedIn} from '../../../+store';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-query-details',
    templateUrl: './query-details.component.html',
    styleUrls: ['./query-details.component.css']
})
export class QueryDetailsComponent implements OnInit, OnDestroy{

    query$: Observable<Query>;
    navigationSubscription: Subscription;
    isLoggedIn: boolean;
    isAdmin: boolean;
    answerOrder = 'score';
    answerPage = 1;
    id: string;

    constructor(private queryService: QueryService,
                private activatedRoute: ActivatedRoute,
                private store: Store<any>,
                private router: Router) {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.id = this.activatedRoute.snapshot.params.id;
                this.queryService.getQueryDetails(this.id, this.answerOrder, this.answerPage);
            }
        });
    }

    ngOnInit() {
        this.query$ = this.queryService.getQueryObservable();
        this.store.select(getAuthIsAdmin)
            .pipe(
                take(1)
            )
            .subscribe(isAdmin => {
                this.isAdmin = isAdmin;
            });

        this.store.select(getAuthIsLoggedIn)
            .pipe(
                take(1)
            )
            .subscribe(isLogged => {
                this.isLoggedIn = isLogged;
            });
    }

    ngOnDestroy(): void {
        this.queryService.destroySubscriptions();
        this.navigationSubscription.unsubscribe();
    }

    delete(id) {
        this.queryService.deleteQuery(id);
    }

    upVoteQuery(queryId) {
        this.queryService.upVote({queryId});
        this.router.navigate(['query', 'details', queryId]);
    }

    downVoteQuery(queryId) {
        this.queryService.downVote({queryId});
        this.router.navigate(['query', 'details', queryId]);
    }

    order($event: string) {
        this.answerOrder = $event;

        this.queryService.getQueryDetails(this.id, this.answerOrder, this.answerPage);
    }

    closeQuery(queryId) {
        this.queryService.closeQuery({queryId});
    }

    openQuery(queryId) {
        this.queryService.openQuery({queryId});
    }

    pageChange($event: number) {
        this.answerPage = $event;
        this.queryService.getQueryDetails(this.id, this.answerOrder, this.answerPage);
    }
}
