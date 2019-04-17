import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import User from '../../../core/models/User';
import {UserService} from '../../../core/services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users$: Observable<User[]>;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.users$ = this.userService.getUsers();
    }

    changeRole(role: string, userId) {
        this.userService.changeRole({role, userId});
    }
}
