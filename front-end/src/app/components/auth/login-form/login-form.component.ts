import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {

    form: FormGroup;
    subscription$: Subscription;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
                username: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]{1,15}')]],
                password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{3,16}$')]],
            }
        );
    }

    ngOnDestroy() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }

    submitForm() {
        this.subscription$ = this.authService.login(this.username.value, this.password.value);
    }

    get username() {
        return this.form.controls.username;
    }

    get password() {
        return this.form.controls.password;
    }

}
