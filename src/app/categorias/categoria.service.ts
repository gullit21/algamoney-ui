import { MoneyHttp } from './../seguranca/money-http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    categoriaUrl: string;

    constructor(private http: MoneyHttp) {
        this.categoriaUrl = `${environment.apiUrl}/categorias`;
    }

    listarTodas(): Observable<any> {
        return this.http.get(`${this.categoriaUrl}`);
    }
}
