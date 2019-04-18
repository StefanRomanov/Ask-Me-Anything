import {Injectable} from '@angular/core';
import User from '../models/User';
import {Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import constants from '../../util/constants';
import {count} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users: User[];
    roles = ['ADMIN', 'USER'];
    usersSubject: Subject<User[]>;
    userCount: Subject<number>;
    subscriptions: Subscription[];

    constructor(private http: HttpClient) {
        this.usersSubject = new Subject<User[]>();
        this.userCount = new Subject<number>();
        this.subscriptions = [];
    }

    findAllUsersByUsernameContains(username, page) {
        const subscription = this.http.get<{
            message: string,
            success: boolean,
            users: User[],
            count: number
        }>(`${constants.AUTH_URL}users?username=${username}&page=${page - 1}`)
            .subscribe(result => {
                this.users = result.users;
                this.userCount.next(result.count);
                this.usersSubject.next(this.users);
                this.subscriptions.push(subscription);
            });
    }

    changeRole(payload) {
        const subscription = this.http.put(`${constants.AUTH_URL}users/manage`, payload)
            .subscribe(result => {
                this.subscriptions.push(subscription);
                this.findAllUsersByUsernameContains('', 1);
            });
    }

    destroySubscriptions() {
        this.subscriptions.forEach(s => {
            s.unsubscribe();
        });
    }

    getUsers() {
        return this.usersSubject.asObservable();
    }

    getCount() {
        return this.userCount.asObservable();
    }
}
