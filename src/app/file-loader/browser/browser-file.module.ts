import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserFileLoader } from './browser-file.loader';
import { FileLoader } from 'file-loader';

@NgModule()
export class BrowserFileModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BrowserFileModule,
            providers: [
                {
                    provide: FileLoader,
                    useClass: BrowserFileLoader,
                },
            ],
        };
    }
}
