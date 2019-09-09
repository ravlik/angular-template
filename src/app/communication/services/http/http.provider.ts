import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ExcludeId, Provider } from '../common/provider';
import { CommunicationConfig } from '../../communication.config';
import { IIdObject } from '../../models/id.object';

@Injectable()
export abstract class HttpProvider<T extends IIdObject> implements Provider<T> {
    protected _baseUrl: string;

    constructor(@Inject(HttpClient) protected _http: HttpClient,
                @Inject(CommunicationConfig) protected _communicationConfig: CommunicationConfig) {
        this._baseUrl = this._getURL(_communicationConfig);
    }

    protected abstract _getURL(config: CommunicationConfig): string;

    getItemById(id: number): Observable<T> {
        return this._http.get<T>(this._concatUrl(id));
    }

    getItems(obj?: any): Observable<T[]> {
        let params = {};
        if (obj) {
            params = new HttpParams({ fromObject: obj });
        }

        return this._http.get<T[]>(this._concatUrl(), { params });
    }

    createItem(item: ExcludeId<T>): Observable<any> {
        return this._http.post(this._concatUrl(), item);
    }

    updateItem(item: T): Observable<any> {
        return this._http.put<any>(this._concatUrl(item.id), item);
    }

    deleteItem(id: number): Observable<any> {
        return this._http.delete(this._concatUrl(id));
    }

    // updateItem(item: T): Observable<any> {
    //     const body: IUpdateRequest[] = [];
    //
    //     for (const prop of Object.keys(item)) {
    //         body.push({
    //             path: prop,
    //             value: item[prop],
    //             operation: 'replace',
    //         });
    //     }
    //     return this._http.patch<any>(this._concatUrl(item.id), body);
    // }

    // getItemsByIds(ids: number[]) {
    //     if (!ids || !ids.length) {
    //         return of([]);
    //     }
    //
    //     return forkJoin(ids.map(id => this.getItemById(id)));
    // }

    private _concatUrl(...params: (string | number)[]): string {
        console.log(`${this._baseUrl}`);
        console.log(...params);

        return `${this._baseUrl}`.concat('/', ...params.map(toString));
    }
}

function toString(i) {
    return i.toString();
}
