import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersProvider } from 'communication';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _userProvider: UsersProvider,
        private _fb: FormBuilder) { }
    user;
    userEditForm: FormGroup;


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
                        Validators.compose([Validators.required, Validators.maxLength(3), Validators.maxLength(10)])),
            userAge: new FormControl(null, Validators.required)
        });

    }

    submitChanges() {
        console.log('submit');
        this.createNewForm();
    }

    protected createNewForm(): FormGroup {
        console.log(new FormGroup({
            userName: new FormControl(null, [Validators.required]),
            userPassword: new FormControl(null, [Validators.required]),
            userAge: new FormControl(null, [Validators.required])
        }));
        return new FormGroup({
            userName: new FormControl(null, [Validators.required]),
            userPassword: new FormControl(null, [Validators.required]),
            userAge: new FormControl(null, [Validators.required])
        });
    }

    cancelChange() {
        this._router.navigate(['../'], { relativeTo: this._route });
    }

}


// protected createForm(): FormGroup {
//     return new FormGroup({
//         firstName: new FormControl(null, [
//             Validators.required,
//         ]),
//         lastName: new FormControl(null, [
//             Validators.required,
//         ]),

//     });
// }

// changeFullName() {
//     this._handleStatusChange(this.form, true);
//     if (this.form.valid) {
//         this.dialogRef.close(this.form.value);
//     }
// }
