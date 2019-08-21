import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateService } from '../translate.service';
import { TranslateFileLoader } from '../translate-file.loader';
import { ServerFileLoaderService } from './server-file.loader.service';

@NgModule()
export class TranslateServerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TranslateServerModule,
            providers: [
                TranslateService,
                {
                    provide: TranslateFileLoader,
                    useClass: ServerFileLoaderService,
                },
            ],
        };
    }
}
