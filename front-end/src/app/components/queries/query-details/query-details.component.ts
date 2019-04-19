import {Component, OnDestroy, OnInit} from '@angular/core';
import Query from '../../../core/models/Query';
import {QueryService} from '../../../core/services/query.service';
import {Subject, Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
    selector: 'app-query-details',
    templateUrl: './query-details.component.html',
    styleUrls: ['./query-details.component.css']
})
export class QueryDetailsComponent implements OnInit, OnDestroy {

    query$: Subject<Query>;
    navigationSubscription: Subscription;
    answerOrder = 'score';
    answerPage = 1;
    id: string;

    constructor(private queryService: QueryService,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService,
                private router: Router) {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.id = this.activatedRoute.snapshot.params.id;
                this.queryService.getQueryDetails(this.id, this.answerOrder, this.answerPage);
            }
        });
    }

    ngOnInit() {
        this.query$ = this.queryService.querySubject;
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
