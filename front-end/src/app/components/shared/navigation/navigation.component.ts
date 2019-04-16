import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, DoCheck {

    isLoggedIn: boolean;
    isAdmin: boolean;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    ngDoCheck() {
        this.isLoggedIn = this.authService.isLoggedIn();
        this.isAdmin = this.authService.isAdmin();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['home']);
    }

}
