import { MoneyHttp } from './../seguranca/money-http';
import { Pessoa } from './../core/model';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class PessoaFiltro {
    nome: string;
    // tslint:disable-next-line: no-inferrable-types
    pagina: number = 0;
    // tslint:disable-next-line: no-inferrable-types
    itensPorPagina: number = 5;
}

@Injectable({
    providedIn: 'root'
})
export class PessoaService {

    pessoaUrl = 'http://localhost:8080/pessoas';

    constructor(private http: MoneyHttp) { }

    pesquisar(filtro: PessoaFiltro): Observable<any> {
        let params = new HttpParams();

        params = params.append('page', `${filtro.pagina}`);
        params = params.append('size', filtro.itensPorPagina ? `${filtro.itensPorPagina}` : '5');

        if (filtro.nome) {
            params = params.append('nome', filtro.nome);
        }

        const httpOptions = {
            params
        };

        return this.http.get(`${this.pessoaUrl}`, httpOptions);
    }

    listarTodas(): Observable<any> {
        return this.http.get(`${this.pessoaUrl}`);
    }

    excluir(codigo: number): Observable<{}> {
        return this.http.delete(`${this.pessoaUrl}/${codigo}`);
    }

    mudarStatus(codigo: number, ativo: boolean): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo, httpOptions);
    }

    adicionar(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.post<Pessoa>(`${this.pessoaUrl}`, pessoa);
    }

    atualizar(pessoa: Pessoa): Observable<Pessoa> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        return this.http.put<Pessoa>(`${this.pessoaUrl}/${pessoa.codigo}`, pessoa, httpOptions);
    }

    buscarPorCodigo(codigo: number): Observable<Pessoa> {
        return this.http.get<Pessoa>(`${this.pessoaUrl}/${codigo}`);
    }
}
