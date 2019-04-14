import {Component, Input, OnInit} from '@angular/core';
import Answer from '../../core/models/Answer';
import {AnswerService} from '../answer.service';

@Component({
    selector: 'app-answer-card',
    templateUrl: './answer-card.component.html',
    styleUrls: ['./answer-card.component.css']
})
export class AnswerCardComponent implements OnInit {
    @Input()
    answer: Answer;

    constructor(private answerService: AnswerService) {
    }

    ngOnInit() {
    }

    downVoteAnswer(answerId: string) {
        this.answerService.downvote({answerId});
    }

    upVoteAnswer(answerId: string) {
        this.answerService.upvote({answerId});
    }
}
