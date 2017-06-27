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
        console.log(JSON.stringify(track, null, 4));
        let formData:FormData = new FormData();
        Object.keys(track).forEach(key => {
            if(key === 'artists') {
                if (track[key].length === 1) {
                    formData.append('artists[0]', String(track[key][0]));
                } else {
                    track[key].forEach(genre => {
                        formData.append(key, String(genre));
                    });
                }
            }
            else formData.append(key, track[key]);
        });
        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${environment.apiUrl}/tracks/`, formData, this.jwt())
            .map(res => res.json());
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