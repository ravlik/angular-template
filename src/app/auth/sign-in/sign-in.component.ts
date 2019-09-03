import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../form.component';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['../auth.scss'],
})
export class SignInComponent extends FormComponent {
    form: FormGroup;

    protected errorsMessages = {
        username: {
            required: 'Username is required',
        },
        password: {
            required: 'Password is required',
            minlength: 'Password must have minimum 8 symbols',
        },
    };

    constructor(@Inject(FormBuilder) private formBuilder: FormBuilder) {
        super();
    }

    protected createForm(): FormGroup {
        return this.formBuilder.group({
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
