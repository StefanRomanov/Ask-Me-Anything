import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Answer from '../models/Answer';
import {Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import constants from '../../util/constants';
import {QueryService} from './query.service';

@Injectable({
    providedIn: 'root'
})
export class AnswerService {

    answer: Answer;
    answerSubject: Subject<Answer>;
    answerListSubject: Subject<Answer[]>;
    subscriptions: Subscription[];

    constructor(private http: HttpClient, private router: Router, private queryService: QueryService) {
        this.answerSubject = new Subject<Answer>();
        this.answerListSubject = new Subject<Answer[]>();
        this.subscriptions = [];
    }

    createAnswer(data, form) {
        this.http.post(`${constants.FEED_URL}answer`, data)
            .subscribe(result => {
                form.reset();
                this.router.navigate(['query', 'details', data.queryId]);
            });
    }

    upvote(payload) {
        const subscription = this.http.post(`${constants.FEED_URL}answer/like`, payload)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'details', this.queryService.query.id]);
            });
    }

    downvote(payload) {
        const subscription = this.http.post(`${constants.FEED_URL}answer/dislike`, payload)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'details', this.queryService.query.id]);
            });
    }

    delete(id: string) {
        const subscription = this.http.delete(`${constants.FEED_URL}answer/${id}`)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'details', this.queryService.query.id]);
            });
    }

    editAnswer(param: { content: string }, id: string) {
        const subscription = this.http.put(`${constants.FEED_URL}answer/${id}`, param)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'details', this.queryService.query.id]);
            });
    }

    destroySubscriptions() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
