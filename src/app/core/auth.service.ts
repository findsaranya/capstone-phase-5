import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private _userLoggedIn = new BehaviorSubject<boolean>(false);
  private _adminLoggedIn = new BehaviorSubject<boolean>(false);

  get userToken():string | null {
     return localStorage.getItem("userToken");
  }

 get userLoggedInOb$():boolean{
  return this._userLoggedIn.value;
 }

 get adminLoggedInOb$():boolean{
  return this._adminLoggedIn.value;
 }

  get adminToken():string | null{
    return localStorage.getItem("adminToken");
  }

  changeUserLoggedInStatus(status:boolean):void{
    this._userLoggedIn.next(status);
  }

  changeAdminLoggedInStatus(status:boolean):void{
    this._adminLoggedIn.next(status);
  }
}
