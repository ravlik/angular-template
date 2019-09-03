import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

    ngOnInit(): void {
        this.form = this.createForm();
        this.form.statusChanges.subscribe(() => this._handleStatusChange(this.form));
        this._handleStatusChange(this.form);
    }

    protected abstract createForm(): FormGroup;

    protected _handleStatusChange(form: FormGroup) {
        const controls = form.controls;
        for (const key of Object.keys(controls)) {
            const control = controls[key];
            if (control.errors && (form.touched || form.dirty) && control.touched) {
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
}
