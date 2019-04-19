import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import Answer from '../../../core/models/Answer';
import {AnswerService} from '../../../core/services/answer.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditAnswerComponent} from '../edit-answer/edit-answer.component';
import {Store} from '@ngrx/store';
import {getAuthIsAdmin, getAuthIsLoggedIn} from '../../../+store';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-answer-card',
    templateUrl: './answer-card.component.html',
    styleUrls: ['./answer-card.component.css']
})
export class AnswerCardComponent implements OnInit, OnDestroy {
    @Input()
    answer: Answer;

    isLoggedIn: boolean;
    isAdmin: boolean;

    @Output()
    emitter = new EventEmitter<Answer>();

    constructor(private answerService: AnswerService, private modalService: NgbModal, private store: Store<any>) {
    }

    ngOnInit() {
        this.store.select(getAuthIsLoggedIn)
            .pipe(
                take(1)
            )
            .subscribe(isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
            });

        this.store.select(getAuthIsAdmin)
            .pipe(
                take(1)
            )
            .subscribe(isAdmin => {
                this.isAdmin = isAdmin;
            });
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
