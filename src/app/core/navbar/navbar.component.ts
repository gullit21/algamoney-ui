import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    exibindoMenu = false;

    constructor(
        private authService: AuthService,
        private logoutService: LogoutService,
        private errorHandler: ErrorHandlerService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    logout() {
        this.logoutService.logout()
            .then(() => {
                this.router.navigate(['/login']);
            })
            .catch(erro => this.errorHandler.handle(erro));
    }

    temPermissao(role: string) {
        this.authService.temPermissao(role);
    }

    get nome() {
        if (this.authService.jwtPayload) {
            return this.authService.jwtPayload.nome;
        }
        return '';
    }
}
