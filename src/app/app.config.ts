import { CommunicationConfig, HttpConfig } from 'communication';
import { Config } from 'config';
import { SentryConfig } from 'sentry';

export interface AuthenticationConfig {
    redirect: string;
}


export class AppConfig extends Config implements CommunicationConfig {
    version: number;
    http: HttpConfig;
    authentication: AuthenticationConfig;
    sentry?: SentryConfig;
}
