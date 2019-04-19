import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import constants from '../../util/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    register(username: string, email: string, password: string) {
        return this.http.post(`${constants.AUTH_URL}register`, {username, email, password});
    }

    login(username: string, password: string) {
        return this.http.post<{ message: string, token: string }>(`${constants.AUTH_URL}login`, {username, password});
    }
}
