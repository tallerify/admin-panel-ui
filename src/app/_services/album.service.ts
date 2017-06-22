import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Album, Albums } from '../_models';

@Injectable()
export class AlbumService {
    constructor(private http: Http) { }

    getAll(): Observable<Albums> {
        return this.http
            .get(environment.apiUrl + '/albums', this.jwt())
            .map((response: Response) => response.json());
    }

    getById(id: string): Observable<Album> {
        return this.http
            .get(environment.apiUrl + '/albums/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

    create(album: Album): Observable<Album> {
        console.log(JSON.stringify(album, null, 4));
        let formData:FormData = new FormData();
        Object.keys(album).forEach(key => {
            if(key === 'artists') {
                album[key].forEach(artistId => {
                    formData.append(key, String(artistId));
                });
            } else if (key === 'genres') {
                album[key].forEach(genre => {
                    formData.append(key, String(genre));
                });
            }
             else formData.append(key, album[key]);
        });
        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${environment.apiUrl}/albums/`, formData, this.jwt())
            .map(res => res.json());
    }

    update(album: Album): Observable<Album> {
        return this.http
            .put(environment.apiUrl + '/albums/' + album.id, album, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http
            .delete(environment.apiUrl + '/albums/' + id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const currentAlbum = JSON.parse(localStorage.getItem('currentAdmin'));
        if (currentAlbum && currentAlbum.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentAlbum.token });
            return new RequestOptions({ headers: headers });
        }
    }
}