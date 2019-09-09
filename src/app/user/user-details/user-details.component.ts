import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersProvider, IUser } from 'communication';
import { relative } from 'path';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
    user: IUser;
    id: number;
    constructor(private _route: ActivatedRoute,
                private _userProvider: UsersProvider,
                private _router: Router) { }

    ngOnInit() {
        this._route.params.subscribe(
            params => {
                this.id = +params.id;
                this._userProvider.getItemById(this.id).subscribe(
                    (res: IUser) => {
                        this.user = res;
                        console.log(this.user);
                    },
                    er => console.error(er)
                );
            },
            error => console.error(error)
        );
    }

    deleteUser(id: number) {
        this._userProvider.deleteItem(id).subscribe(
            res => {
                console.log(res);
                
                this._router.navigate(['../'], {relativeTo: this._route});
            }
        );
    }
}
