import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Track } from '../_models';
import { Tracks } from '../_models/tracks';

@Injectable()
export class TrackService {
    constructor(private http: Http) { }

    getAll(): Observable<Tracks> {
        return this.http
            .get(environment.apiUrl + '/tracks', this.jwt())
            .map((response: Response) => response.json());
    }

    getById(id: string): Observable<Track> {
        return this.http
            .get(environment.apiUrl + '/tracks/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

    create(track: Track): Observable<Track> {
        return this.http
            .post(environment.apiUrl + '/tracks', track, this.jwt())
            .map((response: Response) => response.json());
    }

    update(track: Track): Observable<Track> {
        return this.http
            .put(environment.apiUrl + '/tracks/' + track.id, track, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http
            .delete(environment.apiUrl + '/tracks/' + id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const currentToken = JSON.parse(localStorage.getItem('currentAdmin'));
        console.log(JSON.stringify(currentToken));
        if (currentToken && currentToken.token) {
            console.log(JSON.stringify(currentToken));
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentToken.token });
            return new RequestOptions({ headers: headers });
        }
    }
}