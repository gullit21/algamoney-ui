import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,

        LancamentosModule,
        PessoasModule,
        CoreModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
