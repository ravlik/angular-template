import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../password.validator';

@Component({
    selector: 'app-new-password',
    templateUrl: './new-password.component.html',
    styleUrls: ['../auth.scss'],
})
export class NewPasswordComponent implements OnInit {
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.createForm();
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            passwordConfirm: new FormControl(null, Validators.required),
        }, { validator: MustMatch('password', 'passwordConfirm') });
    }

    submit() {
        if (this.form.valid) {
            console.log('new password', this.form.value.password);
        }
    }

}
