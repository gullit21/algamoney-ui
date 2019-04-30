import { ToastaService } from 'ngx-toasta';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    constructor(private toastaService: ToastaService) { }

    handle(errorResponse: any) {
        let msg: string;

        if (typeof errorResponse === 'string') {
            msg = errorResponse;
        } else {
            msg = 'Erro ao processar serviço remoto. Tente novamente';
            console.log('Ocorreu um erro', errorResponse);
        }

        this.toastaService.error(msg);
    }
}
