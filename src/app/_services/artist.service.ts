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
        return this.http
            .post(environment.apiUrl + '/artists', artist, this.jwt())
            .map((response: Response) => response.json());
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
        const currentArtist = JSON.parse(localStorage.getItem('currentArtist'));
        if (currentArtist && currentArtist.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentArtist.token });
            return new RequestOptions({ headers: headers });
        }
    }
}