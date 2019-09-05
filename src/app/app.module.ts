import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule, CookieService, TransferHttpModule } from '@gorniv/ngx-universal';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TranslateService } from './translate';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { UniversalStorage } from './storage/universal.storage';
import { CommunicationModule } from 'communication';
import { Translate } from './translate/translate';
import { Meta } from 'meta';
import { ConfigModule } from 'config';
import { AppConfig } from './app.config';
import { NotifierModule } from './notifier/notifier.module';

export function initLanguage(translateService: TranslateService): Function {
    return (): Promise<any> => translateService.initLanguage();
}

@NgModule({
    imports: [
        BrowserModule.withServerTransition({ appId: 'my-app' }),
        Meta.forRoot(),
        TransferHttpCacheModule,
        TransferHttpModule,
        HttpClientModule,
        RouterModule,
        AppRoutes,
        BrowserAnimationsModule,
        CookieModule.forRoot(),
        Translate.localize('main'),
        CommunicationModule.forRoot(AppConfig),
        ConfigModule.configure({
            path: 'config/config.json',
            configProvider: AppConfig,
        }),
        NotifierModule,
    ],
    declarations: [AppComponent],
    providers: [
        CookieService,
        UniversalStorage,
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initLanguage,
            multi: true,
            deps: [TranslateService],
        },
    ],
})
export class AppModule {
}
