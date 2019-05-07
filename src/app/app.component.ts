import { Component } from '@angular/core';
import { ToastaConfig } from 'ngx-toasta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        private toastaConfig: ToastaConfig,
        private router: Router
    ) {
        this.toastaConfig.theme = 'bootstrap';
    }

    exibindoNavBar() {
        return this.router.url !== '/login';
    }
}
