import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  criarNovoAccessToken() {
      this.authService.obterNovoAccessToken().subscribe(
          response => {
              this.authService.armazenarToken(response.access_token);

              console.log('Novo access token criado.');
          },
          error => {
              console.log('Erro ao renovar token.', error);
          }
      );
  }
}
