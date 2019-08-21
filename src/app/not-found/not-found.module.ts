import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutes } from './not-found.routing';
import { Translate } from '../translate/translate';

@NgModule({
    imports: [CommonModule, NotFoundRoutes, Translate.localize('not-found')],
    declarations: [NotFoundComponent],
})
export class NotFoundModule {
}
