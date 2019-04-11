import {Component, Input, OnInit} from '@angular/core';
import Answer from '../../models/Answer';

@Component({
    selector: 'app-answer-card',
    templateUrl: './answer-card.component.html',
    styleUrls: ['./answer-card.component.css']
})
export class AnswerCardComponent implements OnInit {
    @Input()
    answer: Answer;

    constructor() {
    }

    ngOnInit() {
    }

}
