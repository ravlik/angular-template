import { CommunicationConfig, HttpConfig } from 'communication';
import { Config } from 'config';
import { SentryConfig } from 'sentry';

import { AuthenticationConfig } from './communication/models/authenticationConfig';

export class AppConfig extends Config implements CommunicationConfig {
    version: number;
    http: HttpConfig;
    authentication: AuthenticationConfig;
    sentry?: SentryConfig;
}
