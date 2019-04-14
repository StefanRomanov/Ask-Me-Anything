import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import Query from '../../core/models/Query';
import {QueryService} from '../query.service';
import {Subject, Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-query-details',
    templateUrl: './query-details.component.html',
    styleUrls: ['./query-details.component.css']
})
export class QueryDetailsComponent implements OnInit, OnDestroy {

    query$: Subject<Query> = this.queryService.querySubject;
    navigationSubscription: Subscription;
    answerOrder = 'score';
    id: string;

    constructor(private queryService: QueryService,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService,
                private router: Router) {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.id = this.activatedRoute.snapshot.params.id;
                this.queryService.getQueryDetails(this.id, this.answerOrder);
            }
        });
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.queryService.destroySubscriptions();
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

        this.queryService.getQueryDetails(this.id, this.answerOrder);
    }

    markAsSolved(queryId) {
        this.queryService.markSolved({queryId});
    }

}
