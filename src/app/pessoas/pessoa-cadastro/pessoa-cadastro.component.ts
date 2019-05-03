import { Pessoa } from './../../core/model';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastaService } from 'ngx-toasta';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

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
        private errorHandlerService: ErrorHandlerService
    ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    console.log(this.pessoa);
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
}
