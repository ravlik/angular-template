import { Component, OnInit } from '@angular/core';
import { UsersProvider, IUser } from 'communication';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
    users: IUser[];

    constructor(private _usersProvider: UsersProvider) { }

    ngOnInit() {
        this._usersProvider.getItems().subscribe(
           (res: IUser[]) => this.users = res,
            error => console.error(error)
        );
    }
}
