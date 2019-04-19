import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import Answer from '../../../core/models/Answer';
import {AnswerService} from '../../../core/services/answer.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditAnswerComponent} from '../edit-answer/edit-answer.component';
import {AuthService} from '../../../core/services/auth.service';

@Component({
    selector: 'app-answer-card',
    templateUrl: './answer-card.component.html',
    styleUrls: ['./answer-card.component.css']
})
export class AnswerCardComponent implements OnInit, OnDestroy {
    @Input()
    answer: Answer;

    @Output()
    emitter = new EventEmitter<Answer>();

    constructor(private answerService: AnswerService, private modalService: NgbModal, private authService: AuthService) {
    }

    ngOnInit() {
    }

    downVoteAnswer(answerId: string) {
        this.answerService.downvote({answerId});
    }

    upVoteAnswer(answerId: string) {
        this.answerService.upvote({answerId});
    }

    delete(id: string) {
        this.answerService.delete(id);
    }

    openForm() {
        const modalRef = this.modalService.open(EditAnswerComponent, { size: 'lg' });
        modalRef.componentInstance.answer = this.answer;
    }

    ngOnDestroy(): void {
        this.answerService.destroySubscriptions();
    }
}
