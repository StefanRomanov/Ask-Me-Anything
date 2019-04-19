import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {getAuthIsLoggedIn} from '../../+store';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {

    constructor(
        private store: Store<any>,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(getAuthIsLoggedIn)
            .pipe(
                take(1),
                map(isLoggedIn => {
                    if (!isLoggedIn) {
                        return true;
                    } else {
                        this.router.navigate(['']);
                        return false;
                    }
                })
            );
    }
}
