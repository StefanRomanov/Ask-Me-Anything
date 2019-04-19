import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnDestroy {

    form: FormGroup;
    subscription$: Subscription;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
                username: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]{1,15}')]],
                email: ['', [Validators.required, Validators.email, Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')]],
                password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{3,16}$')]],
                repeatPassword: ['', Validators.required]
            }
        );
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }

    submitForm() {
        this.subscription$ = this.authService.register(this.username.value, this.email.value, this.password.value);

    }

    get username() {
        return this.form.controls.username;
    }

    get email() {
        return this.form.controls.email;
    }

    get password() {
        return this.form.controls.password;
    }

    get repeatPassword() {
        return this.form.controls.repeatPassword;
    }
}

