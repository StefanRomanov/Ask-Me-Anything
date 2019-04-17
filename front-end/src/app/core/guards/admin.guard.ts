import { Injectable } from '@angular/core';
import { CanLoad, Route, Router,  UrlSegment} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canLoad(route: Route, segments: UrlSegment[]) {
        if (this.authService.isAdmin()) {
            return true;
        } else {
            this.router.navigate(['home']);
            return false;
        }
    }
}
