import { Component } from '@angular/core';
import { ToastaConfig } from 'ngx-toasta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private toastaConfig: ToastaConfig) {
        this.toastaConfig.theme = 'bootstrap';
    }
}
