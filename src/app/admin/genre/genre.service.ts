import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { genreEndpoints } from './genre.endpoint';
import {  IGenreByIdResponse, IGenreData, IGenreListPayload, IGenreListResponse, IGenrePayload, IGenresList } from './genre.model';
import { environment } from 'src/environments/environment.development';
import { IGenre } from 'src/app/shared';

@Injectable()
export class GenreService {
    private _http:HttpClient = inject(HttpClient);

    getAllGenres(payload:IGenreListPayload):Observable<IGenreData>{
        const url = environment.apiUrl + genreEndpoints.getGenere;
        return this._http.post<IGenreListResponse>(url,payload).pipe(map(response=> response.data));
    }

    createGenre(payload:IGenrePayload):Observable<IGenre>{
        const url = environment.apiUrl + genreEndpoints.createGenre;
        return this._http.post<IGenre>(url,payload);
    }

    deleteGenre(payload:IGenre):Observable<string>{
        const url = environment.apiUrl + genreEndpoints.deleteGenre;
        return this._http.post<string>(url,payload);
    }

    getGenreById(genreId:string):Observable<IGenre>{
        const url = environment.apiUrl + genreEndpoints.getGenreById;
        return this._http.get<IGenreByIdResponse>(url + genreId).pipe(map(response => response.data));
    }

    getGenres():Observable<IGenre[]>{
        const url = environment.apiUrl+genreEndpoints.getGenres;
        return this._http.get<IGenresList>(url).pipe(map(response => response.data));
    }
}