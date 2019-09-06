import { Component } from '@angular/core';
import { FormComponent } from '../form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../password.validator';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['../auth.scss'],
})
export class RegisterComponent extends FormComponent {

    protected errorsMessages = {
        username: {
            required: 'Username is required',
            minlength: 'Username must have minimum 3 symbols',
            maxlength: 'Username must have maximum 50 symbols',
        },
        password: {
            required: 'Password is required',
            minlength: 'Password must have minimum 3 symbols',
            maxlength: 'Password must have maximum 50 symbols',
        },
        passwordConfirm: {
            required: 'Confirm password is required',
            mustMatch: 'This field must match with Password',
        },
    };

    protected submitRequest(): Observable<any> {
        return of(true);
    }


    protected createForm(): FormGroup {
        return this.formBuilder.group({
            username: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            passwordConfirm: new FormControl(null, Validators.required),
        }, { validator: MustMatch('password', 'passwordConfirm') });
    }
}
