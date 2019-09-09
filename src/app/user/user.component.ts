import { Component, OnInit } from '@angular/core';
import { UsersProvider, IUser } from 'communication';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
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
