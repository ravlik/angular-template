import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateService } from '../translate.service';
import { TranslateFileLoader } from '../translate-file.loader';
import { BrowserFileLoader } from './browser-file.loader';

@NgModule()
export class TranslateBrowserModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TranslateBrowserModule,
            providers: [
                TranslateService,
                {
                    provide: TranslateFileLoader,
                    useClass: BrowserFileLoader,
                },
            ],
        };
    }
}
