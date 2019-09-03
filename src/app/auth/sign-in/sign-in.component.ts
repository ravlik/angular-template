import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../form.component';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent extends FormComponent {

    protected errorsMessages = {
        username: {
            required: 'Username is required',
        },
        password: {
            required: 'Password is required',
            minlength: 'Password must have minimum 8 symbols',
        },
    };

    constructor() {
        super();
    }

    protected createForm(): FormGroup {
        return new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
            ]),
        });
    }

    signIn() {
        this._handleStatusChange(this.form);
        if (this.form.valid) {
            console.log('after submit', this.form.value);
        }
    }

}
