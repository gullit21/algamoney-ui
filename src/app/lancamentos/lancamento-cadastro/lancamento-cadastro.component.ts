import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastaService } from 'ngx-toasta';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Lancamento } from 'src/app/core/model';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-lancamento-cadastro',
    templateUrl: './lancamento-cadastro.component.html',
    styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

    tipos = [
        { label: 'Receita', value: 'RECEITA' },
        { label: 'Despesa', value: 'DESPESA' }
    ];

    categorias = [];
    pessoas = [];
    lancamento = new Lancamento();

    constructor(
        private categoriaService: CategoriaService,
        private pessoaService: PessoaService,
        private lancamentoService: LancamentoService,
        private toastaService: ToastaService,
        private errorHandlerService: ErrorHandlerService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title
    ) { }

    ngOnInit() {
        const codigoLancamento = this.route.snapshot.params.codigo;
        if (codigoLancamento) {
            this.carregarLancamento(codigoLancamento);
        }

        this.carregarCategorias();
        this.carregarPessoas();

        this.title.setTitle('Novo lançamento');
    }

    get editando() {
        return Boolean(this.lancamento.codigo);
    }

    carregarCategorias() {
        return this.categoriaService.listarTodas().subscribe(
            categorias => {
                this.categorias = categorias.map(
                    categoriaAux => {
                        return { label: categoriaAux.nome, value: categoriaAux.codigo };
                    }
                );
            },
            error => {
                this.errorHandlerService.handle(error);
            }
        )
    }

    carregarPessoas() {
        return this.pessoaService.listarTodas().subscribe(
            pessoas => {
                this.pessoas = pessoas.content.map(
                    pessoaAux => {
                        return { label: pessoaAux.nome, value: pessoaAux.codigo };
                    }
                );
            },
            error => {
                this.errorHandlerService.handle(error);
            }
        )
    }

    carregarLancamento(codigo: number) {
        this.lancamentoService.buscarPorCodigo(codigo).subscribe(
            lancamento => {
                this.converterStringsParaDatas([lancamento]);
                this.lancamento = lancamento;

                this.atualizarTituloEdicao();
            },
            error => {
                this.errorHandlerService.handle(error);
            }
        );
    }

    novo(form: FormControl) {
        form.reset();

        //  Gambiarra para atualizar o lancamento com o Tipo setado.
        setTimeout(function() {
            this.lancamento = new Lancamento();
        }.bind(this), 1);

        this.router.navigate(['/lancamentos/novo']);
    }

    salvar(form: FormControl) {
        if (this.editando) {
            this.atualizarLancamento(form);
        } else {
            this.adicionarLancamento(form);
        }
    }

    adicionarLancamento(form: FormControl) {
        this.lancamentoService.adicionar(this.lancamento).subscribe(
            lancamentoAdicionado => {
                this.toastaService.success('Lançamento adicionado com sucesso!');

                this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
            },
            error => {
                this.errorHandlerService.handle(error);
            }
        );
    }

    atualizarLancamento(form: FormControl) {
        this.lancamentoService.atualizar(this.lancamento).subscribe(
            lancamento => {
                this.toastaService.success('Lançamento alterado com sucesso!');

                this.converterStringsParaDatas([lancamento]);
                this.lancamento = lancamento;
                this.atualizarTituloEdicao();
            },
            error => {
                this.errorHandlerService.handle(error);
            }
        );
    }

    atualizarTituloEdicao() {
        this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
    }

    private converterStringsParaDatas(lancamentos: Lancamento[]) {
        for (const lanc of lancamentos) {
            if (lanc.dataPagamento) {
                lanc.dataPagamento = moment(lanc.dataPagamento, 'YYYY-MM-DD').toDate();
            }

            if (lanc.dataVencimento) {
                lanc.dataVencimento = moment(lanc.dataVencimento, 'YYYY-MM-DD').toDate();
            }
        }

    }
}
