import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { Observable, from as observableFromPromise } from 'rxjs';

import { AuthService } from './auth.service';

export class NotAuthenticatedError { }

@Injectable()
export class MoneyHttp extends HttpClient {

    constructor(
        private auth: AuthService,
        private httpHandler: HttpHandler
    ) {
        super(httpHandler);
    }

    public delete<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.delete<T>(url, options));
    }

    public patch<T>(url: string, body: any, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.patch<T>(url, options));
    }

    public head<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.head<T>(url, options));
    }

    public options<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.options<T>(url, options));
    }

    public get<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.get<T>(url, options));
    }

    public post<T>(url: string, body: any, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.post<T>(url, body, options));
    }

    public put<T>(url: string, body: any, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.put<T>(url, body, options));
    }

    private fazerRequisicao<T>(fn: Function): Observable<T> {
        if (this.auth.isAccessTokenInvalido()) {
            console.log('Requisição HTTP com access token inválido. Obtendo novo token...');

            // descobrir uma maneira de executar o if somente após a execução da chamada para a renovação do Token
            const aux = this.auth.obterNovoAccessToken();
            if (!this.auth.isAccessTokenInvalido()) {
                return fn();
            }

        } else {
            return fn();
        }
    }

}
