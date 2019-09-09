import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersProvider } from 'communication';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _userProvider: UsersProvider) { }
    user;
    userEditForm: FormGroup;
    newUserName: string;
    newUserPassword: string;
    newUserAge: number;


    ngOnInit() {
        this._route.params.subscribe(
            params => {
                const id = +params.id;
                console.log('user id --------', id);
                this.user = this._userProvider.getItemById(id).subscribe(
                    res => {
                        this.user = res;
                        console.log('user -------', this.user);
                    },
                    er => console.error(er)
                );
            },
            error => console.error(error)
        );


        this.userEditForm = new FormGroup({
            userName: new FormControl(this.user.userName, Validators.required),
            userPassword: new FormControl(this.user.Password,
                Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
            userAge: new FormControl(null)
        });

    }

    submitChanges(postData) {
        console.log('this.userEditForm.value;', this.userEditForm.value);

        console.log('updated user ---', this.user);
        this._userProvider.updateItem(this.user).subscribe(
            res => {
                console.log(res);
                this._router.navigate(['./', { relativeTo: this._route }]);
            },
            err => console.error(err)
        );

    }

    cancelChange() {
        this._router.navigate(['./']);
    }

}
