import { AuthService } from './auth.service';
import { MoneyHttp } from './money-http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LogoutService {

    tokensRevokeUrl = 'http://localhost:8080/tokens/revoke';

    constructor(
        private http: MoneyHttp,
        private authService: AuthService
    ) { }

    logout() {
        return this.http.delete(this.tokensRevokeUrl, { withCredentials: true }).toPromise()
            .then(() => {
                this.authService.limparAccessToken();
            });
    }
}
