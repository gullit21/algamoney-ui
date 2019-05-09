import { environment } from './../../environments/environment.prod';
import { AuthService } from './auth.service';
import { MoneyHttp } from './money-http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LogoutService {

    tokensRevokeUrl: string;

    constructor(
        private http: MoneyHttp,
        private authService: AuthService
    ) {
        this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
    }

    logout() {
        return this.http.delete(this.tokensRevokeUrl, { withCredentials: true }).toPromise()
            .then(() => {
                this.authService.limparAccessToken();
            });
    }
}
