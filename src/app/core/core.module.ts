import { AuthService } from './../seguranca/auth.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ToastaModule } from 'ngx-toasta';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { CategoriaService } from './../categorias/categoria.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
    imports: [
        CommonModule,
        RouterModule,

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
        CategoriaService,
        AuthService,

        ConfirmationService,
        Title,
        JwtHelperService,
        {
            provide: LOCALE_ID, useValue: 'pt-BR'
        }
    ]
})
export class CoreModule { }
