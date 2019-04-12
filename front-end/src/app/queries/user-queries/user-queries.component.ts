import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import Query from '../../models/Query';
import {QueryService} from '../query.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-user-queries',
    templateUrl: './user-queries.component.html',
    styleUrls: ['./user-queries.component.css']
})
export class UserQueriesComponent implements OnInit {

    title = `Queries of user ${this.authService.getUsername()}`;
    queries$: Observable<Query[]>;
    searchString = '';
    orderString: string;

    constructor(private authService: AuthService, private queryService: QueryService) {
    }

    ngOnInit() {
        this.queries$ = this.queryService.getByUserIdAndTitle(this.authService.getUserId(), this.searchString, 'popular')
            .pipe(
                map(q => q.queries)
            );
    }

    search(data) {
        this.searchString = data;
        this.queries$ = this.queryService.getByUserIdAndTitle(this.authService.getUserId(), this.searchString, this.orderString )
            .pipe(
                map(q => q.queries)
            );
    }

    order(order) {
        this.orderString = order;
        this.queries$ = this.queryService.getByUserIdAndTitle(this.authService.getUserId(), this.searchString, this.orderString )
            .pipe(
                map(e => e.queries)
            );
    }

}
