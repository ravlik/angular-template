import { Observable } from 'rxjs';
import { IIdObject } from '../models/id.object';

export abstract class Provider<T extends IIdObject> {
    abstract getItemById(id): Observable<T>;

    abstract createItem(item: T): Observable<T>;

    abstract updateItem(item: T): Observable<T>;

    abstract deleteItem(id: number): Observable<boolean>;

    abstract getItems(): Observable<T[]>;
}
