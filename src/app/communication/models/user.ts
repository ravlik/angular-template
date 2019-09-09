import { IIdObject } from 'communication';

export interface IUser extends IIdObject {
    id: number;
    name: string;
    age?: number;
    password?: string;
}
