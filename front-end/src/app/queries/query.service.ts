import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Query from '../core/models/Query';
import {Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import * as Q from 'q';

const FEED_URL = 'http://localhost:3000/feed/';

@Injectable({
    providedIn: 'root'
})
export class QueryService {

    subscriptions: Subscription[];
    query: Query;
    queryList: Query[];
    queryListSubject: Subject<Query[]>;
    querySubject: Subject<Query>;

    constructor(private http: HttpClient, private router: Router) {
        this.queryListSubject = new Subject<Query[]>();
        this.querySubject = new Subject<Query>();
        this.subscriptions = [];
    }

    getAllQueries(search, order, tag) {
        const subscription = this.http.get<{
            message: string,
            success: boolean,
            queries: Query[] }>
        (`${FEED_URL}queries?search=${search}&order=${order}&tag=${tag}`)
            .subscribe(result => {
                this.queryList = result.queries;
                this.queryListSubject.next(this.queryList);
                this.subscriptions.push(subscription);
            });
    }

    createQuery(data) {
        const subscription = this.http.post(`${FEED_URL}query/create`, data)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'all']);
            });
    }

    getByUserIdAndTitle(data, title, order) {
        const subscription = this.http.get<{
            message: string,
            success: boolean,
            queries: Query[] }>
        (`${FEED_URL}queries/user/${data}?title=${title}&order=${order}`)
            .subscribe(result => {
                this.queryList = result.queries;
                this.queryListSubject.next(this.queryList);
                this.subscriptions.push(subscription);
            });
    }

    getLatestQueries() {
        const subscription = this.http.get<{ message: string,
            success: boolean,
            queries: Query[] }>
        (`${FEED_URL}queries/latest`)
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
            query: Query }>
        (`${FEED_URL}query/${id}`)
            .subscribe(result => {
                this.query = result.query;
                this.querySubject.next(this.query);
                this.subscriptions.push(subscription);
            });
    }

    getQueryDetails(id, answerOrder) {
        const subscription = this.http.get<{
            message: string,
            success: boolean,
            query: Query }>
        (`${FEED_URL}query/details/${id}?answers=${answerOrder}`)
            .subscribe(result => {
                this.query = result.query;
                this.querySubject.next(this.query);
                this.subscriptions.push(subscription);
            });
    }

    editQuery(id, payload) {
        const subscription = this.http.put(`${FEED_URL}query/update/${id}`, payload)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'details', this.query.id]);
            });
    }

    upVote(payload) {
        const subscription = this.http.post(`${FEED_URL}query/like`, payload)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'details', this.query.id]);
            });
    }

    downVote(payload) {
        const subscription = this.http.post(`${FEED_URL}query/dislike`, payload)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.router.navigate(['query', 'details', this.query.id]);
            });
    }

    deleteQuery(id) {
        const subscription = this.http.delete(`${FEED_URL}query/${id}`)
            .subscribe(result => {
                this.router.navigate(['query', 'all']);
                this.subscriptions.push(subscription);
            });
    }

    markSolved(id) {
        const subscription = this.http.post(`${FEED_URL}query/solve`, id)
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
