import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILang, TranslateService } from '../translate';
import { UsersProvider } from 'communication';
import { AppConfig } from '../app.config';

@Component({
    selector: 'app-home',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    public langList$: Observable<ILang[]>;
    public currentLang: string;
    users: any;

    constructor(private _translateService: TranslateService,
                private _usersProvider: UsersProvider,
                public config: AppConfig) {
    }

    ngOnInit(): void {
        this.langList$ = this._translateService.getLangList();
        this.currentLang = this._translateService.language;

        console.log(this._usersProvider)
        this.users = this._usersProvider.getItems();
    }

    public changeLang(code: string): void {
        this._translateService.changeLang(code);
    }
}
