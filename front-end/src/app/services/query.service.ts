import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  getAllQueries() {
    return this.http.get('http://localhost:3000/feed/queries')
      .subscribe(data => {
        console.log(data);
      });
  }
}
