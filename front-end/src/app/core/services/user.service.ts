import {Injectable} from '@angular/core';
import User from '../models/User';
import {Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import constants from '../../util/constants';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users: User[];
    roles = ['ROOT', 'ADMIN', 'USER'];
    usersSubject: Subject<User[]>;
    subscriptions: Subscription[];

    constructor(private http: HttpClient) {
        this.usersSubject = new Subject<User[]>();
        this.subscriptions = [];
    }

    findAllUsersByUsernameContains(username) {
        const subscription = this.http.get<{
            message: string,
            success: boolean,
            users: User[],
            count: number
        }>(`${constants.FEED_URL}users?username=${username}`)
            .subscribe(result => {
                this.users = result.users;
                this.usersSubject.next(this.users);
                this.subscriptions.push(subscription);
            });
    }

    changeRole(payload) {
        const subscription = this.http.put(`${constants.FEED_URL}users/manage`, payload)
            .subscribe(result => {
                this.subscriptions.push(subscription);
            });
    }

    getUsers() {
        return this.usersSubject.asObservable();
    }
}
