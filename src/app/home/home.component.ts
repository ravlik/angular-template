import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILang, TranslateService } from '../translate';
import { UsersProvider, IUser } from 'communication';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    public langList$: Observable<ILang[]>;
    public currentLang: string;
    users: IUser[];

    constructor(private _translateService: TranslateService,
                private _usersProvider: UsersProvider) {
    }

    ngOnInit(): void {
        this.langList$ = this._translateService.getLangList();
        this.currentLang = this._translateService.getCurrentLang();

        this._usersProvider.getItems().subscribe(
            (users) => this.users = users
        );
    }

    public changeLang(code: string): void {
        this._translateService.changeLang(code);
    }
}
