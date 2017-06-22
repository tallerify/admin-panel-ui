import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Artist } from '../_models';
import { Artists } from '../_models/artists';

@Injectable()
export class ArtistService {
    constructor(private http: Http) { }

    getAll(): Observable<Artists> {
        return this.http
            .get(environment.apiUrl + '/artists', this.jwt())
            .map((response: Response) => response.json());
    }

    getById(id: string): Observable<Artist> {
        return this.http
            .get(environment.apiUrl + '/artists/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

    create(artist: Artist): Observable<Artist> {
        console.log(JSON.stringify(artist, null, 4));
        let formData:FormData = new FormData();
        Object.keys(artist).forEach(key => {
            if (key === 'genres') {
                artist[key].forEach(genre => {
                    formData.append(key, String(genre));
                });
            }
            else formData.append(key, artist[key]);
        });
        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${environment.apiUrl}/artists/`, formData, this.jwt())
            .map(res => res.json());
    }

    update(artist: Artist): Observable<Artist> {
        return this.http
            .put(environment.apiUrl + '/artists/' + artist.id, artist, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http
            .delete(environment.apiUrl + '/artists/' + id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const currentToken = JSON.parse(localStorage.getItem('currentAdmin'));
        if (currentToken && currentToken.token) {
            console.log(JSON.stringify(currentToken));
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentToken.token });
            return new RequestOptions({ headers: headers });
        }
    }
}