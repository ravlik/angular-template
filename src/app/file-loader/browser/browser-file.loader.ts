import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { FileLoader } from 'file-loader';
import { getPath } from '../path';

@Injectable()
export class BrowserFileLoader implements FileLoader {

    constructor(@Inject(HttpClient) private http: HttpClient,
                @Inject(TransferState) private transferState: TransferState) {
    }

    loadFile(file: string): Observable<Object> {
        const data: any = this.transferState.get(makeStateKey(file), null);

        return data ? of(data) : this.http.get(getPath(file));
    }
}

