import {Component, OnInit} from '@angular/core';
import {QueryService} from '../../core/services/query.service';
import {Observable, Subject} from 'rxjs';
import Query from '../../core/models/Query';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    queries$: Subject<Query[]> = this.queryService.queryListSubject;

    constructor(private queryService: QueryService) {
    }

    ngOnInit() {
        this.queryService.getLatestQueries();
    }
}
