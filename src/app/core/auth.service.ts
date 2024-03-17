import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IAdmin, ILoginForm, IUser } from '../shared/shared.model';
import { HttpClient } from '@angular/common/http';
import { IUserResponse } from './auth.model';
import { environment } from 'src/environments/environment.development';
import { authEndpoints } from './authEndpoints';

@Injectable()
export class AuthService {
  private _user:IUser | null = null;
  private _admin:IAdmin|null = null;
  private _userLoggedIn = new BehaviorSubject<boolean>(false);
  private _adminLoggedIn = new BehaviorSubject<boolean>(false);
  private _http:HttpClient = inject(HttpClient);

  get userId():string | null {
     return localStorage.getItem("userId");
  }


  get user():IUser | null {
    return this._user || null;
  }

  get admin():IAdmin | null {
    return this._admin || null;
  }

  set user(userInfo:IUser){
     this._user = userInfo;
  }

  set admin(admiInfo:IAdmin){
    this._admin = admiInfo;
  }

 get userLoggedInOb$():boolean{
  return this._userLoggedIn.value;
 }

 get adminLoggedInOb$():boolean{
  return this._adminLoggedIn.value;
 }

  get adminId():string | null{
    return localStorage.getItem("adminId");
  }

  setLocalStorage(key:string ,val:string):void{
    localStorage.setItem(key,val);
  }

  removeLocalStorage(key:string):void{
    localStorage.removeItem(key);
  }

  changeUserLoggedInStatus(status:boolean):void{
    this._userLoggedIn.next(status);
  }

  changeAdminLoggedInStatus(status:boolean):void{
    this._adminLoggedIn.next(status);
  }

  userLogin(payload:ILoginForm):Observable<IUser>{
    const url = environment.apiUrl;
    return this._http.post<IUserResponse>(url+ authEndpoints.userLogin,payload).pipe(map(response => response.data))
  }

  getUser(userId:string):Observable<IUser>{
    const url = environment.apiUrl;
    return this._http.get<IUserResponse>(url+ authEndpoints.getUser+userId).pipe(map(response => response.data))
  }

  adminLogin(payload:ILoginForm):Observable<IUser>{
    const url = environment.apiUrl;
    return this._http.post<IUserResponse>(url+ authEndpoints.adminLogin,payload).pipe(map(response => response.data))
  }

  getAdmin(adminId:string):Observable<IUser>{
    const url = environment.apiUrl;
    return this._http.get<IUserResponse>(url+ authEndpoints.getAdmin+adminId).pipe(map(response => response.data))
  }

  logoutUser():void{
    this.changeUserLoggedInStatus(false);
    this.removeLocalStorage("userId");
  }

  logoutAdmin():void{
    this.changeAdminLoggedInStatus(false);
    this.removeLocalStorage("adminId");
  }
 
}
