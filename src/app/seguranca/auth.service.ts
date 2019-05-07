import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    oauthTokenUrl = 'http://localhost:8080/oauth/token';

    constructor(private http: HttpClient) { }

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
}
