import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

    categoriaUrl = 'http://localhost:8080/categorias';

    constructor(private http: HttpClient) { }

    listarTodas(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
            })
        };

        return this.http.get(`${this.categoriaUrl}`, httpOptions);
    }
}
