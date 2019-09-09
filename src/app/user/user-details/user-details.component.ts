import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersProvider, IUser } from 'communication';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
    user: IUser = {} as any;
    
    constructor(private _route: ActivatedRoute,
                private _userProvider: UsersProvider,
                private _router: Router) { }

    ngOnInit() {
        this._route.params.subscribe(
            params => {
                const id = +params.id;
                this._userProvider.getItemById(id).subscribe(
                    (res: IUser) =>  this.user = res,
                    er => console.error(er)
                );
            }
        );
    }

    deleteUser(id: number) {
        if (!id) 
            return;
        
        this._userProvider.deleteItem(id).subscribe(
            res =>  this._router.navigate(['../'], {relativeTo: this._route}),
            error => {
                console.error(error);
            }
        );
    }
}
