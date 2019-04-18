import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import User from '../../../core/models/User';
import {UserService} from '../../../core/services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

    users$: Observable<User[]>;
    totalCount: Observable<number>;
    page = 1;

    searchUsername = '';

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.findAllUsersByUsernameContains(this.searchUsername, this.page);
        this.users$ = this.userService.getUsers();
        this.totalCount = this.userService.getCount();
    }

    changeRole(role: string, userId) {
        this.userService.changeRole({role, userId});

    }

    searchByUsername(data) {
        this.searchUsername = data.search;
        this.userService.findAllUsersByUsernameContains(this.searchUsername, this.page);
    }

    pageChange(page: number) {
        this.page = page;
        this.userService.findAllUsersByUsernameContains(this.searchUsername, this.page);
    }

    ngOnDestroy(): void {
        this.userService.destroySubscriptions();
    }
}
