import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Query from '../../core/models/Query';
@Component({
    selector: 'app-query-list',
    templateUrl: './query-list.component.html',
    styleUrls: ['./query-list.component.css']
})
export class QueryListComponent implements OnInit {

    @Input()
    queries: Query[];

    @Output()
    orderEmitter = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    orderLatest() {
        this.orderEmitter.emit('latest');
    }

    orderPopular() {
        this.orderEmitter.emit('popular');
    }
}
