import {Component, Input, OnInit} from '@angular/core';
import Answer from '../../models/Answer';

@Component({
    selector: 'app-answer-list',
    templateUrl: './answer-list.component.html',
    styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {
    @Input()
    answers: Answer[];

    constructor() {
    }

    ngOnInit() {
    }

}
