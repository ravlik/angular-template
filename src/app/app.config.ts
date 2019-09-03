import { CommunicationConfig, HttpConfig, SentryConfig } from 'communication';
import { Config } from 'config';

export class AppConfig extends Config implements CommunicationConfig {
    version: number;
    http: HttpConfig;
    sentry: SentryConfig;
}
