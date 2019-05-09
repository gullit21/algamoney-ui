import { LogoutService } from './logout.service';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../environments/environment';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [LoginFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: environment.tokenWhiteListedDomains,
                blacklistedRoutes: environment.tokenBlackListedDomains
            }
        }),

        InputTextModule,
        ButtonModule,
        BrowserAnimationsModule
    ],
    providers: [
        AuthGuard,
        LogoutService
    ]
})
export class SegurancaModule { }
