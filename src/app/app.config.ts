import { CommunicationConfig, HttpConfig } from 'communication';
import { Config } from 'config';
import { SentryConfig } from './sentry';

export class AppConfig extends Config implements CommunicationConfig {
    version: number;
    http: HttpConfig;
    sentry?: SentryConfig;
}
