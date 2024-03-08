import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IMovie } from 'src/app/shared';
import { IGnereMoviesPayload, IMovieData, IMovieListPayload, IMovieListResponse, IMovieResponse, IRecentMovieResponse } from './movie.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { movieEndpoints } from './movie.endpoint';

@Injectable()
export class MovieService {
    private _http = inject(HttpClient);

    createMovie(payload:IMovie):Observable<IMovieResponse>{
      const  url = environment.apiUrl + movieEndpoints.create;
      return this._http.post<IMovieResponse>(url,payload);
    }

    getMovies(payload:IMovieListPayload):Observable<IMovieData>{
        const url = environment.apiUrl + movieEndpoints.getAll;
        return this._http.post<IMovieListResponse>(url,payload).pipe(map(response => response.data));
    }

    getRecentMovies():Observable<IMovie[]>{
        const url = environment.apiUrl + movieEndpoints.getRecentMovies;
        return this._http.get<IRecentMovieResponse>(url).pipe(map(response => response.data))
    }

    deleteMovie(id:number):Observable<string>{
        const url = environment.apiUrl + movieEndpoints.delete;
        return this._http.get<IMovieResponse>(url+id).pipe(map(response => response.data));
    }

    getMoviesByGenre(payload:IGnereMoviesPayload):Observable<IMovieData>{
        const url = environment.apiUrl + movieEndpoints.getGenreMovies;
        return this._http.post<IMovieListResponse>(url,payload).pipe(map(response => response.data ));
    }
}