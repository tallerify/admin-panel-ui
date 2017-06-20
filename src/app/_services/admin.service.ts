import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Admin } from '../_models';

@Injectable()
export class AdminService {
    constructor(private http: Http) { }

    getAll(): Observable<Admin> {
        return this.http
            .get(environment.apiUrl + '/admins', this.jwt())
            .map((response: Response) => response.json());
    }

    create(admin: Admin): Observable<Admin> {
        return this.http
            .post(environment.apiUrl + '/admins', admin, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http
            .delete(environment.apiUrl + '/admins/' + id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentAdmin'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
