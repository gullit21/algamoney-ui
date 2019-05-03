import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastaService } from 'ngx-toasta';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Lancamento } from 'src/app/core/model';

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
        private errorHandlerService: ErrorHandlerService
    ) { }

    ngOnInit() {
        this.carregarCategorias();
        this.carregarPessoas();
    }

    carregarCategorias() {
        return this.categoriaService.listarTodas().subscribe(
            categorias => {
                console.log(categorias);
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
                console.log(pessoas.content);
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

    salvar(form: FormControl) {
        console.log(this.lancamento);
        this.lancamentoService.adicionar(this.lancamento).subscribe(
            () => {
                this.toastaService.success('Lançamento adicionado com sucesso!');

                form.reset();
                this.lancamento = new Lancamento();
            },
            error => {
                this.errorHandlerService.handle(error);
            }
        );
    }
}
