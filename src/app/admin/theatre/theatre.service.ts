import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { theatreEndpoint } from './theatre.endpoints';
import { ITheatreData, ITheatreDeleteResponse, ITheatreListPayload, ITheatrePayload, ITheatreResponse, ITheatresList } from './theatre.model';
import { ITheatre } from 'src/app/shared';

@Injectable()
export class TheatreService {
    private _http = inject(HttpClient);

    createTheatre(payload:ITheatrePayload):Observable<string>{
        const url = environment.apiUrl + theatreEndpoint.create;
        return this._http.post<string>(url,payload);
    }

    getAllTheatre(payload:ITheatreListPayload):Observable<ITheatreData>{
        const url = environment.apiUrl + theatreEndpoint.getAll;
        return this._http.post<ITheatreResponse>(url,payload).pipe(map(response => response.data));
    }

    deleteTheatre(id:number):Observable<ITheatreDeleteResponse>{
        const url = environment.apiUrl + theatreEndpoint.delete;
        return this._http.get<ITheatreDeleteResponse>(url + id);
    }

    getTheaters():Observable<ITheatre[]>{
        const url = environment.apiUrl + theatreEndpoint.getTheaters;
        return this._http.get<ITheatresList>(url).pipe(map(response => response.data));
    }

}