import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta } from 'meta';
import { ErrorRoutes } from './error.routing';
import { ErrorComponent } from './error.component';
import { Translate } from '../translate/translate';

@NgModule({
    imports: [
        CommonModule,
        ErrorRoutes,
        Translate.localize('not-found'), // todo
        Meta.forChild(),
    ],
    declarations: [ErrorComponent],
})
export class ErrorModule {
}
