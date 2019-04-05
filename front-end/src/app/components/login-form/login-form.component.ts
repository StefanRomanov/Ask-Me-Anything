import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    form: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
                username: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]{1,15}')]],
                password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{3,16}$')]],
            }
        );
    }

    submitForm() {
        this.authService.login(this.username.value, this.password.value);

    }

    get username() {
        return this.form.controls.username;
    }

    get password() {
        return this.form.controls.password;
    }

}
