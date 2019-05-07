import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
      private authService: AuthService,
      private errorHandlerService: ErrorHandlerService,
      private router: Router
  ) { }

  login(usuario: string, senha: string) {
    this.authService.login(usuario, senha).subscribe(
        response => {
            this.authService.armazenarToken(response.access_token);
            this.router.navigate(['/lancamentos']);
        },
        responseError => {
            let msg = '';

            if (responseError.status === 400) {

                if (responseError.error.error === 'invalid_grant') {
                    msg = 'Usuário ou senha inválida!';
                    this.errorHandlerService.handle(msg);

                    return;
                }
            }

            this.errorHandlerService.handle(responseError);
        }
    );
  }

}
