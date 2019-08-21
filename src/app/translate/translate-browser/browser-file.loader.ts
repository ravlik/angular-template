import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { TranslateFileLoader } from '../translate-file.loader';
import { getLocalizationFile } from '../file';
import { environment } from 'environment';

@Injectable()
export class BrowserFileLoader implements TranslateFileLoader {

    constructor(@Inject(HttpClient) private http: HttpClient,
                @Inject(TransferState) private transferState: TransferState) {
    }

    getTranslation(lang: string, module: string): Observable<Object> {
        const file = getLocalizationFile(lang, module),
            key: StateKey<number> = makeStateKey<number>(file),
            data: any = this.transferState.get(key, null);

        return data ? of(data) : this.http.get(`${environment.assets}${file}`);
    }
}

