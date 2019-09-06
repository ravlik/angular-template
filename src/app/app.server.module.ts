import { Inject, NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { CookieBackendService, CookieService } from '@gorniv/ngx-universal';
import { ServerFileModule } from './file-loader/server/server-file.module';
import { TranslateService } from './translate';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REQUEST } from '@nguniversal/express-engine/tokens';

export class TokenInterceptor implements HttpInterceptor {
    constructor(@Inject(REQUEST) private _request: any) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const Authorization = this._request.cookies.token || '';
        console.log({Authorization})
        request = request.clone({ headers: new HttpHeaders({ Authorization }) });
        return next.handle(request);
    }
}

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
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
})
export class AppServerModule {
}
