import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastaModule } from 'ngx-toasta';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';

@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,

        ToastaModule.forRoot(),
        ConfirmDialogModule
    ],
    exports: [
        NavbarComponent,
        ToastaModule,
        ConfirmDialogModule
    ],
    providers: [
        ErrorHandlerService,
        LancamentoService,
        PessoaService,

        ConfirmationService,
        {
            provide: LOCALE_ID, useValue: 'pt-BR'
        }
    ]
})
export class CoreModule { }
