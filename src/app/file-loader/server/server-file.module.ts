import { ModuleWithProviders, NgModule } from '@angular/core';
import { ServerFileLoader } from './server-file.loader';
import { FileLoader } from '../file.loader';

@NgModule()
export class ServerFileModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServerFileModule,
            providers: [
                {
                    provide: FileLoader,
                    useClass: ServerFileLoader,
                },
            ],
        };
    }
}
