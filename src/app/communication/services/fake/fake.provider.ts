import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IIdObject } from 'communication';
import { ExcludeId, Provider } from '../common/provider';

export abstract class FakeProvider<T extends IIdObject> implements Provider<T> {
    protected _delay: number;

    protected get delay(): number {
        return this._delay >= 0 ? this._delay : 0;
    }

    protected _store: { [key: number]: T } = {};

    constructor() {
        const items = this._getItems();

        for (const item of items) {
            this._store[item.id] = item;
        }
    }

    protected abstract _getItems(): T[];

    getItemById(id): Observable<T> {
        if (id == null || !this._store[id]) {
            return throwError(`Item with ${id} not found`);
        }

        return this._wrapDataInObservable(this._store[id]);
    }

    createItem(item: ExcludeId<T>): Observable<T> {
        if (!item) {
            return throwError('Invalid item');
        }

        const _item: T = { ...item, id: Object.keys(this._store).length + 1 } as T;
        this._store[_item.id] = _item;

        return this._wrapDataInObservable(_item);
    }

    updateItem(item: T): Observable<T> {
        if (!item || !item.id) {
            return throwError('Invalid item');
        }

        this._store[item.id] = item;

        return this._wrapDataInObservable(this._store[item.id]);
    }

    deleteItem(id: number): Observable<boolean> {
        if (!id || !this._store[id]) {
            return throwError(`Invalid item id - ${id}`);
        }

        delete this._store[id];
        
        return this._wrapDataInObservable(true);
    }

    getItems(): Observable<T[]> {
        const items = Object.keys(this._store)
            .map(id => this._store[id]);

        return this._wrapDataInObservable(items);
    }

    protected _wrapDataInObservable(data): Observable<any> {
        return of(data).pipe(delay(this.delay));
    }
}
