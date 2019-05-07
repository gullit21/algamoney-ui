import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ToastaService } from 'ngx-toasta';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Pessoa } from './../../core/model';

@Component({
    selector: 'app-pessoa-cadastro',
    templateUrl: './pessoa-cadastro.component.html',
    styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

    pessoa = new Pessoa();

    constructor(
        private pessoaService: PessoaService,
        private toastaService: ToastaService,
        private errorHandlerService: ErrorHandlerService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title
    ) { }

    ngOnInit() {
        const codigoPessoa = this.route.snapshot.params.codigo;
        if (codigoPessoa) {
            this.carregarPessoa(codigoPessoa);
        }

        this.title.setTitle('Nova pessoa');
    }

    get editando() {
        return Boolean(this.pessoa.codigo);
    }

    carregarPessoa(codigo: number) {
        this.pessoaService.buscarPorCodigo(codigo).subscribe(
            pessoa => {
                this.pessoa = pessoa;

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
            this.pessoa = new Pessoa();
        }.bind(this), 1);

        this.router.navigate(['/pessoas/nova']);
    }

    salvar(form: FormControl) {
        if (this.editando) {
            this.atualizarPessoa(form);
        } else {
            this.adicionarPessoa(form);
        }
    }

    adicionarPessoa(form: FormControl) {
        this.pessoaService.adicionar(this.pessoa).subscribe(
            () => {
                this.toastaService.success('Pessoa adicionada com sucesso!');

                form.reset();
                this.pessoa = new Pessoa();
            },
            error => {
                this.errorHandlerService.handle(error);
            }
        );
    }

    atualizarPessoa(form: FormControl) {
        this.pessoaService.atualizar(this.pessoa).subscribe(
            pessoa => {
                this.toastaService.success('Pessoa alterada com sucesso!');

                this.pessoa = pessoa;
                this.atualizarTituloEdicao();
            },
            error => {
                this.errorHandlerService.handle(error);
            }
        );
    }

    atualizarTituloEdicao() {
        this.title.setTitle(`Edição da pessoa: ${this.pessoa.nome}`);
    }
}
