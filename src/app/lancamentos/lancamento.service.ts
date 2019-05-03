import { Lancamento } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

export class LancamentoFiltro {
    descricao: string;
    dataVencimentoInicio: Date;
    dataVencimentoFim: Date;
    // tslint:disable-next-line: no-inferrable-types
    pagina: number = 0;
    // tslint:disable-next-line: no-inferrable-types
    itensPorPagina: number = 5;
}

@Injectable({
    providedIn: 'root'
})
export class LancamentoService {

    lancamentoUrl = 'http://localhost:8080/lancamentos';

    constructor(private http: HttpClient) { }

    pesquisar(filtro: LancamentoFiltro): Observable<any> {
        let params = new HttpParams();

        params = params.append('page', `${filtro.pagina}`);
        params = params.append('size', filtro.itensPorPagina ? `${filtro.itensPorPagina}` : '5');

        if (filtro.descricao) {
            params = params.append('descricao', filtro.descricao);
        }

        if (filtro.dataVencimentoInicio) {
            params = params.append('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
        }

        if (filtro.dataVencimentoFim) {
            params = params.append('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
            }),
            params
        };

        return this.http.get(`${this.lancamentoUrl}?resumo`, httpOptions);
    }

    excluir(codigo: number): Observable<{}> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
            })
        };

        return this.http.delete(`${this.lancamentoUrl}/${codigo}`, httpOptions);
    }

    adicionar(lancamento: Lancamento): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
            })
        };

        return this.http.post(`${this.lancamentoUrl}`, JSON.stringify(lancamento), httpOptions);
    }
}
