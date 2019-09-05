import { CommunicationConfig, HttpConfig, AuthenticationConfig } from 'communication';
import { Config } from 'config';

export class AppConfig extends Config implements CommunicationConfig {
    version: number;
    http: HttpConfig;
    authentication: AuthenticationConfig;
}
