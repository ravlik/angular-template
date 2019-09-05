import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../form.component';
import { Observable, of, throwError } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../auth.scss'],
})
export class LoginComponent extends FormComponent {

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
    };

    protected submitRequest(): Observable<any> {
        if (this.form.value.username === '111' && this.form.value.password === '111') {
            return of(this.form.value);
        }
        return throwError('Invalid user');
    }

    protected createForm(): FormGroup {
        return this.formBuilder.group({
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
        });
    }
}
