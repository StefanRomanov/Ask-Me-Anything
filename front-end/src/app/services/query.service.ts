import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Query from '../models/Query';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  getAllQueries() {
    return this.http.get<{message: string, success: boolean, queries: Query[]}>('http://localhost:3000/feed/queries')
  }

    createQuery(data) {
        return this.http.post('http://localhost:3000/feed/query/create', data )
            .subscribe(answer => {
                console.log(answer);
            });
    }

    getQuery(id) {
      return this.http.get<{message: string, success: boolean, query: Query}>('http://localhost:3000/feed/query/' + id);
    }

    upVote(payload) {
        return this.http.post('http://localhost:3000/feed/query/like', payload);
    }

    downVote(payload) {
        return this.http.post('http://localhost:3000/feed/query/dislike', payload);
    }
}
