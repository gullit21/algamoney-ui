import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [LoginFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,

        InputTextModule,
        ButtonModule,
        BrowserAnimationsModule
    ]
})
export class SegurancaModule { }
