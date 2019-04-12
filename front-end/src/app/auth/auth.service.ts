import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

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
        return window.localStorage.getItem('username');
    }

    isLoggedIn() {
        return window.localStorage.getItem('auth_token') !== null;
    }

    getUserId() {
        return window.localStorage.getItem('user');
    }

    logout() {
        window.localStorage.clear();
    }
}
