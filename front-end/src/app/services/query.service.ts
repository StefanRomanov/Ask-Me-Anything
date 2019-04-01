import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Query from '../models/Query';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  getAllQueries() {
    return this.http.get<Query[]>('http://localhost:3000/feed/queries')
      .subscribe(data => {
        console.log(data);
      });
  }
}
