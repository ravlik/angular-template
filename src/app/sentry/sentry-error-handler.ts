import { Injectable, ErrorHandler, Inject } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { CommunicationConfig } from 'communication';
import { AppConfig } from '../app.config';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {

    constructor(@Inject(AppConfig) protected _communicationConfig: AppConfig) {
    }

    handleError(error) {
        if (!this._communicationConfig.sentry.enable)
            return;
        const dsnUrl = this._getDsnUrl(this._communicationConfig);
        if (dsnUrl) {
            Sentry.init({ dsn: dsnUrl });
            const eventId = Sentry.captureException(error.originalError || error);
            Sentry.showReportDialog({ eventId });
        }
    }

    protected _getDsnUrl(config: CommunicationConfig): string {
        if (!this._communicationConfig.sentry.enable || !this._communicationConfig.sentry.dsn) 
            return;
        else return config.sentry.dsn;
    }
}
