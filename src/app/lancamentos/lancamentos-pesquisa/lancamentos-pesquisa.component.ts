import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { ToastaService } from 'ngx-toasta';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
    selector: 'app-lancamentos-pesquisa',
    templateUrl: './lancamentos-pesquisa.component.html',
    styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

    totalRegistros = 0;
    filtro = new LancamentoFiltro();
    lancamentos = [];
    @ViewChild('tabela') grid;

    constructor(
        private lancamentoService: LancamentoService,
        private authService: AuthService,
        private toastaService: ToastaService,
        private confirmationService: ConfirmationService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title
    ) { }

    ngOnInit(): void {
        this.title.setTitle('Pesquisa de lançamentos');
    }

    pesquisar(pagina = 0) {
        this.filtro.pagina = pagina;

        this.lancamentoService.pesquisar(this.filtro).subscribe(
            response => {
                const lancamentos = response.content;

                const resultado = {
                    lancamentos,
                    total: response.totalElements
                };

                this.lancamentos = resultado.lancamentos;
                this.totalRegistros = resultado.total;
            },
            error => {
                this.errorHandlerService.handle(error);
            }
        );
    }

    aoMudarPagina(event: LazyLoadEvent) {
        const pagina = event.first / event.rows;
        this.pesquisar(pagina);
    }

    confimarExclusao(lancamento: any) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => {
                this.excluir(lancamento);
            }
        });
    }

    excluir(lancamento: any) {
        this.lancamentoService.excluir(lancamento.codigo).subscribe(
            () => {
                const pagina = this.grid.first / this.grid.rows;
                this.pesquisar(pagina);

                this.toastaService.success('Lançamento excluído com sucesso!');
            },
            error => {
                this.errorHandlerService.handle(error);
            }
        );
    }
}
