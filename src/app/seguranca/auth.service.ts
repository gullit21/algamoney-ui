import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    jwtHelper = new JwtHelperService();

    oauthTokenUrl = 'http://localhost:8080/oauth/token';
    jwtPayload: any;

    constructor(
        private http: HttpClient
    ) {
        this.carregarToken();
    }

    login(usuario: string, senha: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA=='
            })
        };

        const body = `username=${usuario}&password=${senha}&grant_type=password`;

        return this.http.post(`${this.oauthTokenUrl}`, body, httpOptions);
    }

    armazenarToken(token: string) {
        this.jwtPayload = this.jwtHelper.decodeToken(token);
        localStorage.setItem('token', token);
    }

    private carregarToken() {
        const token = localStorage.getItem('token');

        if(token) {
            this.armazenarToken(token);
        }
    }
}
