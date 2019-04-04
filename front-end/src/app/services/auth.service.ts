import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(username: string,  email: string, password: string ) {
      return this.http.post('http://localhost:3000/auth/register', { username, email, password});
  }
}
