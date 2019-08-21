import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { TranslateFileLoader } from '../translate-file.loader';
import { environment } from 'environment';
import { getLocalizationFile } from '../file';

const fs = require('fs');

@Injectable()
export class ServerFileLoaderService implements TranslateFileLoader {
    constructor(private transferState: TransferState) {
    }

    public getTranslation(lang: string, module: string): Observable<any> {
        const file = getLocalizationFile(lang, module),
            data = JSON.parse(fs.readFileSync(`${environment.assets}${file}`)),
            key: StateKey<number> = makeStateKey<number>(file);

        this.transferState.set(key, data);
        return of(data);
    }
}
