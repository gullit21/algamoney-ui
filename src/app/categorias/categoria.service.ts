import { MoneyHttp } from './../seguranca/money-http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    categoriaUrl = 'http://localhost:8080/categorias';

    constructor(private http: MoneyHttp) { }

    listarTodas(): Observable<any> {
        return this.http.get(`${this.categoriaUrl}`);
    }
}
