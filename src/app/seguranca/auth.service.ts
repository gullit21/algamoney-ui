import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    oauthTokenUrl = 'http://localhost:8080/oauth/token';
    jwtPayload: any;

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService
    ) {
        this.carregarToken();
    }

    login(usuario: string, senha: string): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA=='
            }),
            withCredentials: true
        };

        const body = `username=${usuario}&password=${senha}&grant_type=password`;

        return this.http.post(`${this.oauthTokenUrl}`, body, httpOptions);
    }

    armazenarToken(token: string) {
        this.jwtPayload = this.jwtHelper.decodeToken(token);
        localStorage.setItem('token', token);
    }

    // obterNovoAccessToken() {
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    //             Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    //         }),
    //         withCredentials: true
    //     };

    //     const body = 'grant_type=refresh_token';

    //     return this.http.post<any>(`${this.oauthTokenUrl}`, body, httpOptions);
    // }

    obterNovoAccessToken(): Promise<void> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

        const body = 'grant_type=refresh_token';

        return this.http.post<any>(this.oauthTokenUrl, body,
            { headers, withCredentials: true })
            .toPromise()
            .then(response => {
                this.armazenarToken(response.access_token);

                console.log('Novo access token criado!');

                return Promise.resolve(null);
            })
            .catch(response => {
                console.error('Erro ao renovar token.', response);
                return Promise.resolve(null);
            });
    }

    isAccessTokenInvalido() {
        const token = localStorage.getItem('token');

        return !token || this.jwtHelper.isTokenExpired(token);
    }

    temPermissao(permissao: string) {
        return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
    }

    temQualquerPermissao(roles) {
        for (const role of roles) {
            if (this.temPermissao(role)) {
                return true;
            }
        }

        return false;
    }

    private carregarToken() {
        const token = localStorage.getItem('token');

        if (token) {
            this.armazenarToken(token);
        }
    }
}
