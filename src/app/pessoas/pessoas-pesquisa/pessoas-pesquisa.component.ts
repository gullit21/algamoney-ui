import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastaService } from 'ngx-toasta';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
    selector: 'app-pessoas-pesquisa',
    templateUrl: './pessoas-pesquisa.component.html',
    styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

    totalRegistros = 0;
    filtro = new PessoaFiltro();
    pessoas = [];
    @ViewChild('tabela') grid;

    constructor(
        private pessoaSerivce: PessoaService,
        private toastaService: ToastaService,
        private confirmationService: ConfirmationService,
        private errorHandlerService: ErrorHandlerService) { }

    ngOnInit(): void {
        this.pesquisar();
    }

    pesquisar(pagina = 0) {
        this.filtro.pagina = pagina;

        this.pessoaSerivce.pesquisar(this.filtro).subscribe(
            response => {
                const responseJson = response;
                const pessoas = responseJson.content;

                const resultado = {
                    pessoas,
                    total: responseJson.totalElements
                };

                this.pessoas = resultado.pessoas;
                this.totalRegistros = resultado.total;
            }
        );
    }

    listarTodas() {
        this.pessoaSerivce.listarTodas().subscribe(
            response => {
                const responseJson = response;
                const pessoas = responseJson.content;

                const resultado = {
                    pessoas,
                    total: responseJson.totalElements
                };

                return resultado.pessoas;
            }
        );
    }

    aoMudarPagina(event: LazyLoadEvent) {
        const pagina = event.first / event.rows;
        this.pesquisar(pagina);
    }

    confimarExclusao(pessoa: any) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => {
                this.excluir(pessoa);
            }
        });
    }

    excluir(pessoa: any) {
        this.pessoaSerivce.excluir(pessoa.codigo).subscribe(
            () => {
                const pagina = this.grid.first / this.grid.rows;
                this.pesquisar(pagina);

                this.toastaService.success('Pessoa excluída com sucesso!');
            },
            error => {
                this.errorHandlerService.handle(error);
            }
        );
    }
}
