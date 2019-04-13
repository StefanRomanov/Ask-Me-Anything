import {Component, OnInit} from '@angular/core';
import {QueryService} from '../queries/query.service';
import {Observable} from 'rxjs';
import Query from '../models/Query';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    queries$: Observable<Query[]>;

    constructor(private queryService: QueryService) {
    }

    ngOnInit() {
        this.queries$ = this.queryService.getLatestQueries()
            .pipe(
                map(e => e.queries)
            );
    }
}
