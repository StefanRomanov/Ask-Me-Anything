import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import Query from '../../core/models/Query';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {QueryService} from '../query.service';

@Component({
    selector: 'app-query-tagged',
    templateUrl: './query-tagged.component.html',
    styleUrls: ['./query-tagged.component.css']
})
export class QueryTaggedComponent implements OnInit {

    queries$: Subject<Query[]> = this.queryService.queryListSubject;
    title: string;
    searchString = '';
    orderString: string;
    tag: string;

    constructor(private activatedRoute: ActivatedRoute, private queryService: QueryService) {
    }

    ngOnInit() {
        this.tag = this.activatedRoute.snapshot.params.tag;
        this.title = `Queries tagged: ${this.tag}`;

        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag);
    }

    search(data: string) {
        this.searchString = data;

        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag);
    }

    order(order: string) {
        this.orderString = order;

        this.queryService.getAllQueries(this.searchString, this.orderString, this.tag);
    }

}
