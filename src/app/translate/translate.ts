import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService as NGXTranslateService } from '@ngx-translate/core';
import { TranslateService } from './translate.service';
import { MODULE_PREFIX, ModuleTranslateLoader } from './module-translate.loader';
import { AppMissingTranslationHandler } from './app-missing-translation.handler';


@NgModule({
    imports: [CommonModule, TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useClass: ModuleTranslateLoader,
        },
        missingTranslationHandler: {
            provide: MissingTranslationHandler,
            useClass: AppMissingTranslationHandler,
        },
    })],
    exports: [TranslateModule],
})
export class Translate {
    static localize(module: string): ModuleWithProviders {
        return {
            ngModule: Translate,
            providers: [
                {
                    provide: MODULE_PREFIX,
                    useValue: module,
                },
            ],
        };
    }

    constructor(private _ngxTranslateService: NGXTranslateService, private _translateService: TranslateService) {
        _translateService.register(_ngxTranslateService);
    }
}
