import { HttpProvider } from './http.provider';
import { CommunicationConfig } from '../../communication.config';
import { IUser } from '../../models/user';

export class HttpUsersProvider extends HttpProvider<IUser> {
    protected _getURL(config: CommunicationConfig): string {
        return config.http.users;
    }
}

