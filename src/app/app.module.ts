import { LancamentoService } from './lancamentos/lancamento.service';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,

        LancamentosModule,
        PessoasModule,
        CoreModule

    ],
    providers: [LancamentoService],
    bootstrap: [AppComponent]
})
export class AppModule { }
