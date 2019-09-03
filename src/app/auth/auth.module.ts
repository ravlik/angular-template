import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth.component';
import { AuthRouting } from './auth-routing';
import { MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        AuthComponent,
    ],
    imports: [
        CommonModule,
        AuthRouting,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
    ],
})
export class AuthModule {
}
