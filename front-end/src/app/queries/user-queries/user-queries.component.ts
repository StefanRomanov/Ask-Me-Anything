import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable, Subject} from 'rxjs';
import Query from '../../core/models/Query';
import {QueryService} from '../query.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-user-queries',
    templateUrl: './user-queries.component.html',
    styleUrls: ['./user-queries.component.css']
})
export class UserQueriesComponent implements OnInit {

    title = `Queries of user ${this.authService.getUsername()}`;
    queries$: Subject<Query[]> = this.queryService.queryListSubject;
    searchString = '';
    orderString = 'popular';
    tag = '';

    constructor(private authService: AuthService, private queryService: QueryService) {
    }

    ngOnInit() {
        this.queryService.getByUserIdAndTitle(this.authService.getUserId(), this.searchString, this.orderString);
    }

    search(data) {
        this.searchString = data;
        this.queryService.getByUserIdAndTitle(this.authService.getUserId(), this.searchString, this.orderString );
    }

    order(order) {
        this.orderString = order;
        this.queryService.getByUserIdAndTitle(this.authService.getUserId(), this.searchString, this.orderString );
    }

}
