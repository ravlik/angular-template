import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILang, TranslateService } from '../translate';
import { UsersProvider, IUser } from 'communication';

@Component({
    selector: 'app-home',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    public langList$: Observable<ILang[]>;
    public currentLang: string;
    users: IUser[];

    constructor(private _translateService: TranslateService,
                private _usersProvider: UsersProvider) {
    }

    ngOnInit(): void {
        this.langList$ = this._translateService.getLangList();
        this.currentLang = this._translateService.language;

        this._usersProvider.getItems();
    }

    public changeLang(code: string): void {
        this._translateService.changeLang(code);
    }
}
