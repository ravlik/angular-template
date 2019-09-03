import { Component, Inject } from '@angular/core';
import { FormComponent } from '../form.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../password.validator';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['../auth.scss'],
})
export class SignUpComponent extends FormComponent {
    form: FormGroup;

    protected errorsMessages = {
        username: {
            required: 'Username is required',
        },
        password: {
            required: 'Password is required',
            minlength: 'Password must have minimum 8 symbols',
        },
        passwordConfirm: {
            required: 'Confirm password is required',
            mustMatch: 'This field must match with Password',
        },
    };

    constructor(@Inject(FormBuilder) private formBuilder: FormBuilder) {
        super();
    }

    protected createForm(): FormGroup {
        return this.formBuilder.group({
            username: new FormControl('', Validators.required),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(8),
            ]),
            passwordConfirm: new FormControl(null, Validators.required),
        }, { validator: MustMatch('password', 'passwordConfirm') });
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    signUp() {
        this._handleStatusChange(this.form);
        if (this.form.valid) {
            console.log('data from registration', this.form.value);
        }
    }


}
