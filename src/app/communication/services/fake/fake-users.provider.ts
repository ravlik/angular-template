import { IUser } from '../../models/user';
import { Provider } from '../common/provider';
import { FakeProvider } from './fake.provider';
import { Observable, of } from 'rxjs';

export class FakeUsersProvider extends FakeProvider<IUser> implements Provider<IUser> {
    protected _getItems(): IUser[] {
        return new Array(10).fill('').map((i, id) => 
        ({ id, name: `Name ${id}`, password: `Password${id}`, age: this._generateDate(new Date(1950, 0, 1), new Date(2002, 0, 1)) }));
    }

    private _generateDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
}

