import { Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotifierService } from '../notifier/notifier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

export interface IErrorMessage {
    [error: string]: string;
}

export interface IErrorsMessages {
    [controlName: string]: IErrorMessage;
}

export abstract class FormComponent implements OnInit {
    form: FormGroup;
    errors: IErrorMessage = {};

    protected abstract errorsMessages: IErrorsMessages;

    protected abstract submitRequest(): Observable<any>;

    constructor(@Inject(FormBuilder) protected formBuilder: FormBuilder,
                @Inject(NotifierService) protected notifier: NotifierService,
                @Inject(AppConfig) private _communicationConfig: AppConfig,
                @Inject(ActivatedRoute) private route: ActivatedRoute,
                @Inject(Router) protected router: Router) {
    }

    ngOnInit(): void {
        this.form = this.createForm();
        this._handleStatusChange(this.form);
    }

    protected abstract createForm(): FormGroup;

    private _handleStatusChange(form: FormGroup, isSubmitted = false) {
        const controls = form.controls;
        for (const key of Object.keys(controls)) {
            const control = controls[key];
            if (control.errors && (form.touched || form.dirty || isSubmitted) && (control.touched || isSubmitted)) {
                this.errors[key] = this._getError(key, control.errors);
            } else {
                this.errors[key] = '';
            }
        }
    }

    protected _getError(key: string, errors: any) {
        const errorProp = Object.keys(errors)[0];

        if (this.errorsMessages[key].hasOwnProperty(errorProp)) {
            return this.errorsMessages[key][errorProp];
        }
        return 'This field does not meet the requirements';
    }

    submit() {
        this._handleStatusChange(this.form, true);

        if (this.form.valid) {
            this.submitRequest().subscribe(
                () => this._handleSuccessSubmit(),
                (e) => this._handleErrorSubmit(e));
        }
    }

    protected _handleSuccessSubmit() {
        const redirect = this.route.snapshot.queryParamMap.get('redirect'),
            config = this._communicationConfig,
            authentication = config && config.authentication,
            url = redirect || authentication && authentication.redirect;

        if (url)
            window.location.replace(url);
        else
            this.notifier.showError('Please provide valid redirect URL');
    }

    private _handleErrorSubmit(e: any) {
        return this.notifier.showError(e);
    }
}
