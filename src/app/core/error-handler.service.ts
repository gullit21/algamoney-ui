import { ToastaService } from 'ngx-toasta';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    constructor(private toastaService: ToastaService) { }

    handle(errorResponse: any) {
        let msg: string;

        if (typeof errorResponse === 'string') {
            msg = errorResponse;
        } else if (errorResponse.status >= 400 && errorResponse.status <= 499) {

            msg = 'Ocorreu um erro ao processar a sua solicitação';

            try {

                msg = errorResponse.error[0].mensagemUsuario;
            } catch (e) {
                console.log('Ocorreu um erro', errorResponse);
            }

        } else {

            msg = 'Erro ao processar serviço remoto. Tente novamente';
            console.log('Ocorreu um erro', errorResponse);
        }

        this.toastaService.error(msg);
    }
}
