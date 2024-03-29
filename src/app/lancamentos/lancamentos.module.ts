import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        LancamentoCadastroComponent,
        LancamentosPesquisaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,

        CurrencyMaskModule,
        SelectButtonModule,
        CalendarModule,
        InputTextareaModule,
        InputTextModule,
        ButtonModule,
        TableModule,
        TooltipModule,
        CalendarModule,
        DropdownModule,
        BrowserAnimationsModule,

        SharedModule
    ],
    exports: []
})
export class LancamentosModule { }
