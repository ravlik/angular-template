import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../password.validator';
import { FormComponent } from '../form.component';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-new-password',
    templateUrl: './new-password.component.html',
    styleUrls: ['../auth.scss'],
})
export class NewPasswordComponent extends FormComponent {

    protected errorsMessages = {
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

    protected createForm(): FormGroup {
        return this.formBuilder.group({
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            passwordConfirm: new FormControl(null, Validators.required),
        }, { validator: MustMatch('password', 'passwordConfirm') });
    }

    protected submitRequest(): Observable<any> {
        return of(this.form.value);
    }

    protected _handleSuccessSubmit() {
        if (this.form.valid) {
            console.log('send email to this address ->', this.form.value.password);
        }
    }
}
