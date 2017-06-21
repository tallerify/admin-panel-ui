import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post(environment.apiUrl + '/admins/tokens', { userName: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const admin = response.json();
                if (admin) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentAdmin', JSON.stringify(admin));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentAdmin');
    }
}
