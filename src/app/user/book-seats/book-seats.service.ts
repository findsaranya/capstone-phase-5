import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IBookedSeats, IBookedSeatsPayload, IBookedSeatsResponse, ICreateSeatsResponse } from './book-seats.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { bookedSeatsEndpoint } from './book-seats.endpoint';

@Injectable()
export class BookedSeatService {
    private _http = inject(HttpClient);

    getBookedSeats(payload:IBookedSeatsPayload):Observable<IBookedSeats[]>{
        const url = environment.apiUrl+bookedSeatsEndpoint.getBookedSeats;
        return this._http.post<IBookedSeatsResponse>(url,payload).pipe(map(response => response.data));
    }

    bookSeats(payload:IBookedSeats[]):Observable<ICreateSeatsResponse>{
        const url = environment.apiUrl+bookedSeatsEndpoint.createSeats;
        return this._http.post<ICreateSeatsResponse>(url,payload);
    }
}