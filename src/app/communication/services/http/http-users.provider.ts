import { IUser } from '../../models/user';
import { HttpProvider } from './http.provider';

export class HttpUsersProvider extends HttpProvider<IUser> {
    protected _baseUrl = null;
}

