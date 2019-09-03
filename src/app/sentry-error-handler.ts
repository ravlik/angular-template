import { Injectable, ErrorHandler, Inject } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { CommunicationConfig } from 'communication';
import { AppConfig } from './app.config';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {

    constructor(@Inject(AppConfig) protected _communicationConfig: AppConfig) {
    }

    handleError(error) {
        if (this._getDsnUrl(this._communicationConfig)) {
            Sentry.init({dsn: this._getDsnUrl(this._communicationConfig)});
        const eventId = Sentry.captureException(error.originalError || error);
        Sentry.showReportDialog({ eventId });
        }
    }

    protected _getDsnUrl(config: CommunicationConfig): string {
        return config.sentry.dsn;
    }
}
