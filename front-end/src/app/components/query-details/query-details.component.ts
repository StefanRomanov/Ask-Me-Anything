import {Component, OnDestroy, OnInit} from '@angular/core';
import Query from '../../models/Query';
import {QueryService} from '../../services/query.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-query-details',
    templateUrl: './query-details.component.html',
    styleUrls: ['./query-details.component.css']
})
export class QueryDetailsComponent implements OnInit, OnDestroy {

    query: Query;
    subscription$: Subscription;
    id: string;

    constructor(private queryService: QueryService, private activatedRoute: ActivatedRoute) {
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
    }

    upVoteQuery() {
        this.queryService.upVote({queryId: this.query.id});
    }

    downVoteQuery() {
        this.queryService.downVote({queryId: this.query.id});
    }
}
