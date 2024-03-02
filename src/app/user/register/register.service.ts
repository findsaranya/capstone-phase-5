import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { regEndpoint } from './register.endpoint';
import { Observable, map } from 'rxjs';
import { IUserRegisterResponse } from './register.model';
import { IUser } from 'src/app/shared';

@Injectable()
export class RegisterService {
    private _http = inject(HttpClient);

    createUser(payload:IUser):Observable<IUser>{
        const url = environment.apiUrl + regEndpoint.createUser;
        return this._http.post<IUserRegisterResponse>(url,payload).pipe(map(response => response.data));
    }
}