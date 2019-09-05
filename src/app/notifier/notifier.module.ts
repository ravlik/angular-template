import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierService } from './notifier.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ToastrModule.forRoot({
            timeOut: 1000,
        }),
        BrowserAnimationsModule,
    ],
    exports: [
        ToastrModule,
        BrowserAnimationsModule,
    ],
    providers: [
        NotifierService,
    ],
})
export class NotifierModule {
}
