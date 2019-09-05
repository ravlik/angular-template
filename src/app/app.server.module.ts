import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { CookieBackendService, CookieService } from '@gorniv/ngx-universal';
import { ServerFileModule } from './file-loader/server/server-file.module';
import { TranslateService } from './translate';

@NgModule({
    imports: [
        // AppModule - FIRST!!!
        AppModule,
        ServerModule,
        NoopAnimationsModule,
        ServerTransferStateModule,
        ModuleMapLoaderModule,
        ServerFileModule.forRoot(),
    ],
    bootstrap: [AppComponent],
    providers: [
        TranslateService,
        {
            provide: CookieService,
            useClass: CookieBackendService,
        },
    ],
})
export class AppServerModule {
}
