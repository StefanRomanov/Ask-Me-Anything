import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserContext} from '../models/UserContext';
import decode from 'jwt-decode';
import constants from '../../util/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userContext: UserContext;

    initialUserContext: UserContext = {
        userId: null,
        username: null,
        token: null,
        role: null,
        isLoggedIn: false
    };

    constructor(private http: HttpClient, private router: Router) {
    }

    register(username: string, email: string, password: string) {
        return this.http.post(`${constants.AUTH_URL}register`, {username, email, password});
    }

    login(username: string, password: string) {
        return this.http.post(`${constants.AUTH_URL}login`, {username, password});
    }

    getToken() {
        return window.localStorage.getItem('auth_token');
    }

    getUsername() {
        return this.userContext.username;
    }

    isAdmin() {
        return this.userContext.role === 'ADMIN' ||  this.userContext.role === 'ROOT';
    }

    isLoggedIn() {
        return this.userContext.userId !== null;
    }

    getUserId() {
        return this.userContext.userId;
    }

    logout() {
        window.localStorage.clear();
        this.userContext = {...this.initialUserContext};
        this.router.navigate(['']);
    }

    setUserContext() {
        const token = this.getToken();

        if (token === null) {
            this.userContext = {...this.initialUserContext};
        } else {
            try {
                const decoded = decode(token);
                this.userContext = {
                    isLoggedIn: true,
                    token,
                    ...decoded
                };

                console.log(this.userContext);

            } catch (e) {
                this.userContext = {...this.initialUserContext};
            }
        }
    }
}
