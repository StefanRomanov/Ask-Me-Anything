import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {Store} from '@ngrx/store';
import {getAuthIsAdmin} from '../../+store';
import {map, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanLoad {

    constructor(
        private store: Store<any>,
        private router: Router
    ) {
    }

    canLoad(route: Route, segments: UrlSegment[]) {

        return this.store.select(getAuthIsAdmin)
            .pipe(
                take(1),
                map(isAdmin => {
                    if (isAdmin) {
                       return true;
                    } else {
                        this.router.navigate(['']);
                        return false;
                    }
                })
            );
    }
}
