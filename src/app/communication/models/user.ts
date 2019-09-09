import { IIdObject } from 'communication';

export interface IUser extends IIdObject {
    id: number;
    name: string;
    age?: Date;
    password?: string;
}
