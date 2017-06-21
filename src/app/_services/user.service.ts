import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { Users } from '../_models/users';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll(): Observable<Users> {
        return this.http
            .get(environment.apiUrl + '/users', this.jwt())
            .map((response: Response) => response.json());
    }

    getById(id: string): Observable<User> {
        return this.http
            .get(environment.apiUrl + '/users/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

    create(user: User): Observable<User> {
        let formData:FormData = new FormData();
        formData.append('userName', user.userName);
        formData.append('password', user.password);
        formData.append('firstName', user.firstName);
        formData.append('lastName', user.lastName);
        formData.append('country', user.country);
        formData.append('birthdate', user.birthdate);
        formData.append('email', user.email);
        formData.append('avatar', user.avatar);
        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${environment.apiUrl}/users/`, formData, this.jwt())
            .map(res => res.json());
    }

    update(user: User): Observable<User> {
        return this.http
            .put(environment.apiUrl + '/users/' + user.id, user, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http
            .delete(environment.apiUrl + '/users/' + id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentToken'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
