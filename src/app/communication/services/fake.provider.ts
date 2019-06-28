import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IIdObject } from '../models/id.object';

export abstract class FakeProvider<T extends IIdObject> {
    protected _delay: number;

    protected get delay(): number {
        return this._delay >= 0 ? this._delay : 0;
    }

    protected _store: { [key: number]: T } = {};

    getItemById(id): Observable<T> {
        return of(this._store[id]).pipe(delay(this.delay));
    }

    createItem(item: T): Observable<T> {
        if (!item) {
            return throwError('Invalid item');
        }

        item.id = Object.keys(this._store).length + 1;
        this._store[item.id] = item;

        return of(this._store[item.id]).pipe(delay(this.delay));
    }

    updateItem(item: T): Observable<T> {
        if (!item || !item.id) {
            return throwError('Invalid item');
        }

        this._store[item.id] = item;

        return of(this._store[item.id]).pipe(delay(this.delay));
    }

    deleteItem(id: number): Observable<boolean> {
        if (!id) {
            return throwError(`Invalid item id - ${id}`);
        }

        delete this._store[id];

        return of(true).pipe(delay(this.delay));
    }

    getItems(): Observable<T[]> {
        const items = Object.keys(this._store)
            .map(id => this._store[id]);

        return of(items).pipe(delay(this.delay));
    }

    getItemsByIds(ids?: number[]): Observable<T[]> {
        if (!ids) {
            ids = Object.keys(this._store) as any;
        }

        return of(ids.map(id => this._store[id])).pipe(delay(this.delay));
    }
}
