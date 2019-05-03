import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

import { registerLocaleData } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';

registerLocaleData(localePt, 'pt-BR');

const routes: Routes = [
    { path: 'lancamentos', component: LancamentosPesquisaComponent },
    { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
    { path: 'pessoas', component: PessoasPesquisaComponent }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes),

        LancamentosModule,
        PessoasModule,
        CoreModule

    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
