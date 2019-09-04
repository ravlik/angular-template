import { Injectable, ErrorHandler, Inject } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { CommunicationConfig } from 'communication';
import { AppConfig } from '../app.config';

@Injectable({
    providedIn: 'root',
})
export class SentryErrorHandler implements ErrorHandler {
    isInitDone: boolean;
    constructor(@Inject(AppConfig) protected _communicationConfig: AppConfig) { }

    handleError(error) {
        if (!this.isInitDone) {
            this._isInitialized();
            this.handleError(error);
        } else {
            const eventId = Sentry.captureException(error.originalError || error);
            Sentry.showReportDialog({ eventId });
        }
    }

    private _isInitialized(): boolean {
        if (!this._communicationConfig.sentry.enable ||
            !this._communicationConfig.sentry.dsn ||
            this._communicationConfig === null ||
            typeof this._communicationConfig.sentry.dsn !== 'string') {
            console.log('is Sentry init  ', false);
            return this.isInitDone = false;
        } else {
            Sentry.init({ dsn: this._communicationConfig.sentry.dsn });
            return this.isInitDone = true;
        }
    }
}
