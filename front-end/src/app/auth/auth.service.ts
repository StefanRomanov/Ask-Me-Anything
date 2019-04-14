import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserContext} from '../core/models/UserContext';
import decode from 'jwt-decode';

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
        return this.http.post('http://localhost:3000/auth/register', {username, email, password});
    }

    login(username: string, password: string) {
        return this.http.post('http://localhost:3000/auth/login', {username, password});
    }

    getToken() {
        return window.localStorage.getItem('auth_token');
    }

    getUsername() {
        return this.userContext.username;
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

            } catch (e) {
                console.log(e);
                this.userContext = {...this.initialUserContext};
            }
        }
    }
}
