import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { FileLoader } from 'file-loader';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { getPath } from '../path';

const fs = require('fs');

@Injectable()
export class ServerFileLoader implements FileLoader {
    constructor(private transferState: TransferState) {
    }

    loadFile(file: string): Observable<any> {
        const data = JSON.parse(fs.readFileSync(getPath(file)));

        this.transferState.set(makeStateKey(file), data);

        return of(data);
    }
}
