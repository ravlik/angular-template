import { SentryConfig } from 'app/sentry/sentry.module';

export interface HttpConfig {
    users: string;
}

export class CommunicationConfig {
    http: HttpConfig;
    sentry: SentryConfig;
}
