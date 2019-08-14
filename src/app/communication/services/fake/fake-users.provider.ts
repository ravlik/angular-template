import { IUser } from '../../models/user';
import { Provider } from '../common/provider';
import { FakeProvider } from './fake.provider';

export class FakeUsersProvider extends FakeProvider<IUser> implements Provider<IUser> {
    protected _getItems(): IUser[] {
        return new Array(100).fill('').map((i, id) => ({ id, name: `Name ${id}` }));
    }
}

