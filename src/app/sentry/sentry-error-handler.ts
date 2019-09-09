import { Injectable, ErrorHandler } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { AppConfig } from '../app.config';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {

    constructor(protected _communicationConfig: AppConfig) {
    }

    handleError(error) {
        console.log(error);
        if (!this.initIfNeed())
            return;

        const eventId = Sentry.captureException(error.originalError || error);
        Sentry.showReportDialog({ eventId });
    }

    private initIfNeed(): boolean {
        const config = this._communicationConfig,
            sentryConfig = config && config.sentry,
            dsnUrl = sentryConfig && sentryConfig.dsn;

        if (dsnUrl && sentryConfig.enable) {
            Sentry.init({ dsn: dsnUrl });
            return true;
        }

        return false;
    }
}
