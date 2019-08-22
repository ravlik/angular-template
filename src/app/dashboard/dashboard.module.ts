import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes, routes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { Translate } from '../translate/translate';
import { MatIconModule } from '@angular/material';
import { MetaGuard, MetaLoader, MetaService, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { TranslateService as NGXTranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LANG_LIST } from '../translate/translate.service';
import { RouterModule } from '@angular/router';


export function metaFactory(translate: NGXTranslateService): MetaLoader {
    return new MetaStaticLoader({
        callback: (key: string): Observable<string | Object> => translate.get(key),
        pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
        pageTitleSeparator: ' | ',
        applicationName: 'App Universal',
        defaults: {
            title: 'test title',
            description: 'test d',
            'og:site_name': 'App site Universal',
            'og:type': 'website',
            'og:locale': 'uk_UA',
            'og:locale:alternate': LANG_LIST
                .map((lang: any) => lang.culture)
                .toString(),
        },
    });
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        Translate.localize('dashboard'),
        MatIconModule,
    ],
    providers: [
        {
            provide: MetaLoader,
            useFactory: metaFactory,
            deps: [NGXTranslateService],
        },
        MetaService,
        MetaGuard
    ],
    declarations: [DashboardComponent],
})
export class DashboardModule {
}
