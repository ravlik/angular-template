import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../form.component';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['../auth.scss'],
})
export class ForgotPasswordComponent extends FormComponent {

    protected errorsMessages = {
        email: {
            required: 'Email is required',
            email: 'Email is not valid',
        },
    };

    protected createForm(): FormGroup {
        return this.formBuilder.group({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
        });
    }

    protected submitRequest(): Observable<any> {
        return of(this.form.value);
    }

    protected _handleSuccessSubmit() {
        if (this.form.valid) {
            console.log('send email to this address ->', this.form.value.email);
            this.router.navigate(['/new-password']);
        }
    }
}
