export interface HttpConfig {
    users: string;
}

export interface SentryConfig {
    dsn: string;
}

export class CommunicationConfig {
    http: HttpConfig;
    sentry: SentryConfig;
}
