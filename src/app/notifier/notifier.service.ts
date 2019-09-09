import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class NotifierService {
    constructor(private notifier: ToastrService) {
    }

    showSuccess(message: string | HttpErrorResponse) {
        this.notifier.success(this._getMessage(message));
    }

    showError(message: string | HttpErrorResponse) {
        this.notifier.error(this._getMessage(message));
    }

    private _getMessage(message: string | HttpErrorResponse, defaultMessage?: string) {
        if (message instanceof HttpErrorResponse) {
            message = message.message;
        }

        return message || defaultMessage;
    }
}
