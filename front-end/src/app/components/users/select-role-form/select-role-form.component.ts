import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-select-role-form',
    templateUrl: './select-role-form.component.html',
    styleUrls: ['./select-role-form.component.css']
})
export class SelectRoleFormComponent implements OnInit {

    form: FormGroup;

    @Input()
    currentRole: string;
    @Input()
    roles: string[];

    @Output()
    roleEmitter = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            role: [this.currentRole],
        });
    }

    onSubmit() {
        this.currentRole = this.role.value;
        this.roleEmitter.emit(this.currentRole);
    }

    get role() {
        return this.form.controls.role;
    }

}
