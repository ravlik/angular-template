import { TranslateLoader } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { Inject, InjectionToken } from '@angular/core';
import { TranslateFileLoader } from './translate-file.loader';

export const MODULE_PREFIX = new InjectionToken<string>('MODULE_PREFIX');

export class ModuleTranslateLoader implements TranslateLoader {
    constructor(@Inject(MODULE_PREFIX) private _module: string,
                @Inject(TranslateFileLoader) private translateFileLoader: TranslateFileLoader) {

    }

    getTranslation(lang: string): Observable<any> {
        if (!this._module)
            return throwError('Module should be provided');

        return this.translateFileLoader.getTranslation(lang, this._module);
    }
}



