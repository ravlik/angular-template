export interface HttpConfig {
    users: string;
}

export interface AuthenticationConfig {
    redirect: string;
}

export class CommunicationConfig {
    http: HttpConfig;
    authentication: AuthenticationConfig;
}
