import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExcludeId, Provider } from '../common/provider';
import { IIdObject } from 'communication';

@Injectable()
export abstract class HttpProvider<T extends IIdObject> implements Provider<T> {
    protected abstract _baseUrl: string;

    constructor(protected _http: HttpClient) {
    }

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
        return `${this._baseUrl}`.concat(...params.map(toString));
    }
}

function toString(i) {
    return i.toString();
}
