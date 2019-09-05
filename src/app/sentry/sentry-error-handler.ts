import { Injectable, ErrorHandler, Inject } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { AppConfig } from '../app.config';

@Injectable({
    providedIn: 'root',
})
export class SentryErrorHandler implements ErrorHandler {
    isInitDone: boolean;
    constructor(protected _communicationConfig: AppConfig) { }

    handleError(error) {
        if (!this.initIfNeed()) {
            return;
        } else {
            const eventId = Sentry.captureException(error.originalError || error);
            Sentry.showReportDialog({ eventId });
        }
    }

    private initIfNeed(): boolean {
        const sentryConfig = this._communicationConfig;

        if (sentryConfig === null ||
            !sentryConfig.sentry.dsn ||
            !sentryConfig.sentry.enable ||
            typeof sentryConfig.sentry.dsn !== 'string') {
            return false;
        } else {
            Sentry.init({ dsn: this._communicationConfig.sentry.dsn });
            return true;
        }
    }
}
