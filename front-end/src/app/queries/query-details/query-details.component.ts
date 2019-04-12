import {Component, OnDestroy, OnInit} from '@angular/core';
import Query from '../../models/Query';
import {QueryService} from '../query.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-query-details',
    templateUrl: './query-details.component.html',
    styleUrls: ['./query-details.component.css']
})
export class QueryDetailsComponent implements OnInit, OnDestroy {

    query: Query;
    subscription$: Subscription;
    subscriptionDownVote: Subscription;
    subscriptionUpVote: Subscription;
    id: string;

    constructor(private queryService: QueryService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.params.id;

        this.subscription$ = this.queryService.getQuery(this.id)
            .subscribe(result => {
                this.query = result.query;
            });
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
        if (this.subscriptionDownVote) {
            this.subscriptionDownVote.unsubscribe();
        }

        if (this.subscriptionUpVote) {
            this.subscriptionUpVote.unsubscribe();
        }
    }

    upVoteQuery() {
        this.subscriptionUpVote = this.queryService.upVote({queryId: this.query.id})
            .subscribe(answer => {
            this.subscription$ = this.queryService.getQuery(this.id)
                .subscribe(result => {
                    this.query = result.query;
                });
        });
    }

    downVoteQuery() {
        this.subscriptionDownVote = this.queryService.downVote({queryId: this.query.id})
            .subscribe(answer => {
                this.subscription$ = this.queryService.getQuery(this.id)
                    .subscribe(result => {
                        this.query = result.query;
                    });
            });
    }
}
