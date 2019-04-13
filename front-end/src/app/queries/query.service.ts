import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Query from '../models/Query';

const FEED_URL = 'http://localhost:3000/feed/';

@Injectable({
    providedIn: 'root'
})
export class QueryService {


    constructor(private http: HttpClient) {
    }

    getAllQueries(search, order, tag) {
        return this.http.get<{
            message: string,
            success: boolean,
            queries: Query[] }>(`${FEED_URL}queries?search=${search}&order=${order}&tag=${tag}`);
    }

    createQuery(data) {
        return this.http.post(`${FEED_URL}query/create`, data);
    }

    getByUserIdAndTitle(data, title, order) {
        return this.http.get<{
            message: string,
            success: boolean,
            queries: Query[] }>(`${FEED_URL}queries/user/${data}?title=${title}&order=${order}`);
    }

    getLatestQueries() {
        return this.http.get<{ message: string, success: boolean, queries: Query[] }>(`${FEED_URL}queries/latest`);
    }

    getQuery(id) {
        return this.http.get<{ message: string, success: boolean, query: Query }>(`${FEED_URL}query/${id}`);
    }

    editQuery(id, payload) {
        return this.http.put(`${FEED_URL}query/update/${id}`, payload);
    }

    upVote(payload) {
        return this.http.post(`${FEED_URL}query/like`, payload);
    }

    downVote(payload) {
        return this.http.post(`${FEED_URL}query/dislike`, payload);
    }

    deleteQuery(id) {
        return this.http.delete(`${FEED_URL}query/${id}`);
    }
}
