import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {getAuthIsLoggedIn} from '../../+store';
import {map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private store: Store<any>,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(getAuthIsLoggedIn)
            .pipe(
                take(1),
                map(isLoggedIn => {
                    if (isLoggedIn) {
                        return true;
                    } else {
                        this.router.navigate(['auth', 'login']);
                        return false;
                    }
                })
            );
    }
}
