import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersProvider, IUser } from 'communication';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
    user: IUser;
    isCreateMood: boolean = true;

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _userProvider: UsersProvider) { }
    
    userEditForm: FormGroup =  new FormGroup({
        name: new FormControl(null, Validators.required),
        password: new FormControl(null,
            Validators.compose([Validators.required, Validators.minLength(3)])),
        age: new FormControl(null, Validators.required),
        id: new FormControl(null),
    });

    ngOnInit() {
        this._route.params.subscribe(
            params => {
                const id = +params.id;
                if (!isNaN(id)) {
                    this.isCreateMood = false;
                    this._userProvider.getItemById(id).subscribe(
                        res => {
                          this.user = res;
                           this._initForm(res);
                        },
                        er => console.error(er)
                    );
                }
            }
        );
    }

    private _initForm(user) {
        return this.userEditForm.setValue(this.user);
    }

    submitForm(postData) {
        if (this.isCreateMood) {
            this._userProvider.createItem(postData).subscribe(
                res => {
                    console.log(res);
                this._router.navigate([`users/${res.id}`]);
                },
                er => console.error(er)
            );
            return ;
        }
        this._userProvider.updateItem(postData).subscribe(
            res => {
                console.log(res);
                this._router.navigate(['../'], {relativeTo: this._route});
            },
            err => console.error(err)
        );

    }

    cancelChange() {
        this._router.navigate(['./']);
    }

}
