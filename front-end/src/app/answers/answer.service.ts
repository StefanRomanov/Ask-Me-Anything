import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AnswerService {

    constructor(private http: HttpClient) {
    }

    createQuery(data) {
        this.http.post('http://localhost:3000/feed/answer', data)
            .subscribe(result => {
                console.log(result);
            });
    }

    upvote() {
    }

    downvote() {
    }
}
