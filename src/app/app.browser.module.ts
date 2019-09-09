import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StateTransferInitializerModule } from '@nguniversal/common';
import { environment } from 'environment';
import { BrowserFileModule } from './file-loader/browser/browser-file.module';
import { TranslateService } from './translate';

// the Request object only lives on the server
export function getRequest(): any {
    return { headers: { cookie: document.cookie } };
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        AppModule,
        StateTransferInitializerModule,
        BrowserTransferStateModule,
        ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production}),
        BrowserFileModule.forRoot(),
    ],
    providers: [
        TranslateService,
        {
            // The server provides these in main.server
            provide: REQUEST,
            useFactory: getRequest,
        },
        {
            provide: 'ORIGIN_URL',
            useValue: location.origin,
        },
    ],
})
export class AppBrowserModule {
}
