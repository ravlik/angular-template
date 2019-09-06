import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['../auth.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    form: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit() {
        this.form = this.createForm();
    }

    private createForm(): FormGroup {
        return this.formBuilder.group({
            email: new FormControl('', [
                Validators.required,
                Validators.email,
            ]),
        });
    }

    forgotPassword() {
        if (this.form.valid) {
            console.log('send email to this address ->', this.form.value.email);
            this.router.navigate(['/newPassword']);
        }
    }

}
