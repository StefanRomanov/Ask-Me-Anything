import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Answer from '../../../core/models/Answer';

@Component({
    selector: 'app-answer-list',
    templateUrl: './answer-list.component.html',
    styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {
    @Input()
    answers: Answer[];

    @Input()
    totalAnswers: number;

    answerForEdit: Answer;

    @Output()
    orderEmitter = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    orderLatest() {
        this.orderEmitter.emit('createdAt');
    }

    orderPopular() {
        this.orderEmitter.emit('score');
    }

    editAnswer($event: Answer) {
        this.answerForEdit = $event;
    }
}
