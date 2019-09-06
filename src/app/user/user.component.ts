import { Component, OnInit } from '@angular/core';
import { UsersProvider } from 'communication';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
    users: any;

    constructor(private _usersProvider: UsersProvider) { }

    ngOnInit() {
        this._usersProvider.getItems().subscribe(
            res => this.users = res,
            error => console.error(error)
        );
    }
}
