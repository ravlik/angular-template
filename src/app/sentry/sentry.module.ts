import { NgModule, ErrorHandler } from '@angular/core';
import { SentryErrorHandler } from './sentry-error-handler';
import { ModuleWithProviders } from '@angular/compiler/src/core';

export interface SentryConfig {
    dsn: string;
    enable: boolean;
}

@NgModule({})
export class SentryModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SentryModule,
            providers: [
                {
                    provide: ErrorHandler,
                    useClass: SentryErrorHandler,
                },
            ],
        };
    }
}
