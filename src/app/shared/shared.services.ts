import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IMovie, IMovieListResponse, IMovieSearchData, IMovieSearchPayload } from './shared.model';
import { environment } from 'src/environments/environment.development';
import { movieSearchEndpoint } from './shared.endpoint';
import { Observable, map } from 'rxjs';

@Injectable()
export class SharedService {
    private _http = inject(HttpClient);

    searchMovies(payload:IMovieSearchPayload):Observable<IMovieSearchData>{
        const url = environment.apiUrl + movieSearchEndpoint.searchMovie;
        return this._http.post<IMovieListResponse>(url,payload).pipe(map(response => response.data));
    }
}