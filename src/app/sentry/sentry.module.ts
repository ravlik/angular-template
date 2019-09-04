import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentryErrorHandler } from './sentry-error-handler';

export interface SentryConfig {
    dsn: string;
    enable: boolean;
}

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [SentryErrorHandler],
})
export class SentryModule {
}
