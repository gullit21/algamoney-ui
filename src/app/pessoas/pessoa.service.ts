import { Pessoa } from './../core/model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

    constructor(private http: HttpClient) { }

    pesquisar(filtro: PessoaFiltro): Observable<any> {
        let params = new HttpParams();

        params = params.append('page', `${filtro.pagina}`);
        params = params.append('size', filtro.itensPorPagina ? `${filtro.itensPorPagina}` : '5');

        if (filtro.nome) {
            params = params.append('nome', filtro.nome);
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
            }),
            params
        };

        return this.http.get(`${this.pessoaUrl}`, httpOptions);
    }

    listarTodas(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
            })
        };

        return this.http.get(`${this.pessoaUrl}`, httpOptions);
    }

    excluir(codigo: number): Observable<{}> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
            })
        };

        return this.http.delete(`${this.pessoaUrl}/${codigo}`, httpOptions);
    }

    mudarStatus(codigo: number, ativo: boolean): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
            })
        };

        return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo, httpOptions);
    }

    adicionar(pessoa: Pessoa): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
            })
        };

        return this.http.post(`${this.pessoaUrl}`, JSON.stringify(pessoa), httpOptions);
    }

    atualizar(pessoa: Pessoa): Observable<Pessoa> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
            })
        };

        return this.http.put<Pessoa>(`${this.pessoaUrl}/${pessoa.codigo}`, JSON.stringify(pessoa), httpOptions);
    }

    buscarPorCodigo(codigo: number): Observable<Pessoa> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
            })
        };

        return this.http.get<Pessoa>(`${this.pessoaUrl}/${codigo}`, httpOptions);
    }
}
