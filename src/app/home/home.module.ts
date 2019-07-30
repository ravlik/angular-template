import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';
import { CommentComponent } from '../comment/comment.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material';

@NgModule({
    imports: [CommonModule, HomeRoutes, TranslateModule, FormsModule, MatCardModule, MatButtonModule],
    declarations: [HomeComponent, CommentComponent],
})
export class HomeModule {
}
