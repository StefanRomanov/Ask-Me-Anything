import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Query from '../models/Query';
import {Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import constants from '../../util/constants';

const FEED_URL = 'http://localhost:3000/feed/';

@Injectable({
    providedIn: 'root'
})
export class QueryService {
    subscriptions: Subscription[];
    query: Query;
    queryList: Query[];
    queryCount: Subject<number>;
    queryListSubject: Subject<Query[]>;
    querySubject: Subject<Query>;

    constructor(private http: HttpClient, private router: Router) {
        this.queryListSubject = new Subject<Query[]>();
        this.querySubject = new Subject<Query>();
        this.queryCount = new Subject<number>();
        this.subscriptions = [];
    }

    getAllQueries(search, order, tag, page) {
        const subscription = this.http.get<{
            message: string,
            success: boolean,
            queries: Query[],
            count: number
        }>
        (`${constants.FEED_URL}queries?search=${search}&order=${order}&tags=${tag}&page=${page - 1}`)
            .subscribe(result => {
                this.queryList = result.queries;
                this.queryCount.next(result.count);
                this.queryListSubject.next(this.queryList);
                this.subscriptions.push(subscription);
            });
    }

    createQuery(data) {
        const subscription = this.http.post(`${constants.FEED_URL}query/create`, data)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'all']);
            });
    }

    getByUserIdAndTitle(data, title, order, tags, page) {
        const subscription = this.http.get<{
            message: string,
            success: boolean,
            queries: Query[],
            count: number
        }>
        (`${constants.FEED_URL}queries/user/${data}?title=${title}&tags=${tags}&order=${order}&page=${page - 1}`)
            .subscribe(result => {
                this.queryList = result.queries;
                this.queryCount.next(result.count);
                this.queryListSubject.next(this.queryList);
                this.subscriptions.push(subscription);
            });
    }

    getLatestQueries() {
        const subscription = this.http.get<{
            message: string,
            success: boolean,
            queries: Query[],
            count: number
        }>
        (`${constants.FEED_URL}queries/latest`)
            .subscribe(result => {
                this.queryList = result.queries;
                this.queryListSubject.next(this.queryList);
                this.subscriptions.push(subscription);
            });
    }

    getQuery(id) {
        const subscription = this.http.get<{
            message: string,
            success: boolean,
            query: Query
        }>
        (`${constants.FEED_URL}query/${id}`)
            .subscribe(result => {
                this.query = result.query;
                this.querySubject.next(this.query);
                this.subscriptions.push(subscription);
            });
    }

    getQueryDetails(id, answerOrder, page) {
        const subscription = this.http.get<{
            message: string,
            success: boolean,
            query: Query,
            count: number
        }>
        (`${constants.FEED_URL}query/details/${id}?answers=${answerOrder}&page=${page - 1}`)
            .subscribe(result => {
                this.query = result.query;
                this.query.totalAnswerCount = result.count;
                this.querySubject.next(this.query);
                this.subscriptions.push(subscription);
            });
    }

    editQuery(id, payload) {
        const subscription = this.http.put(`${constants.FEED_URL}query/update/${id}`, payload)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'details', this.query.id]);
            });
    }

    upVote(payload) {
        const subscription = this.http.post(`${constants.FEED_URL}query/like`, payload)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'details', this.query.id]);
            });
    }

    downVote(payload) {
        const subscription = this.http.post(`${constants.FEED_URL}query/dislike`, payload)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'details', this.query.id]);
            });
    }

    deleteQuery(id) {
        const subscription = this.http.delete(`${constants.FEED_URL}query/${id}`)
            .subscribe(result => {
                this.router.navigate(['query', 'all']);
                this.subscriptions.push(subscription);
            });
    }

    markSolved(id) {
        const subscription = this.http.post(`${constants.FEED_URL}query/solve`, id)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'details', this.query.id]);
            });
    }

    destroySubscriptions() {
        this.subscriptions.forEach(
            s => s.unsubscribe()
        );
    }
}
