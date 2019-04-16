import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

    page: number;
    @Input()
    totalPages: string;

    @Output()
    pageEmitter = new EventEmitter<number>();


    constructor() {
    }

    ngOnInit() {
        this.page = 1;
    }

    prevPage() {
        this.page = this.page - 1;
        this.pageEmitter.emit(this.page);
    }

    pageChange() {
        this.pageEmitter.emit(this.page);
    }

    nextPage() {
        this.page = this.page + 1;
        this.pageEmitter.emit(this.page);
    }
}
