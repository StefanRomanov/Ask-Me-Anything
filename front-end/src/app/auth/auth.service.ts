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
        return this.http.post('http://localhost:3000/auth/login', {username, password})
            .subscribe(result => {
                window.localStorage.setItem('auth_token', result['token']);
                window.localStorage.setItem('user', result['userId']);
                this.router.navigate(['']);
            });
    }
}
