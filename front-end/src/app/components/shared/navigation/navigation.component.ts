import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getAuthIsAdmin, getAuthIsLoggedIn, getAuthUsername} from '../../../+store';
import {Logout} from '../../../+store/auth/actions';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, DoCheck {

    isLoggedIn$: Observable<boolean>;
    isAdmin$: Observable<boolean>;
    username$: Observable<string>;

    constructor(private store: Store<any>, private router: Router) {
    }

    ngOnInit() {
    }

    ngDoCheck() {
        this.isLoggedIn$ = this.store.select(getAuthIsLoggedIn);
        this.isAdmin$ = this.store.select(getAuthIsAdmin);
        this.username$ = this.store.select(getAuthUsername);
    }

    logout() {
        this.store.dispatch(new Logout());
    }

}
