import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Login} from '../../../+store/auth/actions';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {

    form: FormGroup;

    constructor(private formBuilder: FormBuilder, private store: Store<any>) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
                username: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]{3,16}')]],
                password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{3,16}$')]],
            }
        );
    }

    ngOnDestroy() {
    }

    submitForm() {
        this.store.dispatch(new Login(this.form.value));
    }

    get username() {
        return this.form.controls.username;
    }

    get password() {
        return this.form.controls.password;
    }

}
