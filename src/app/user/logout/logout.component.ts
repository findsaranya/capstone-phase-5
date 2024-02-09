import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  template:""
})
export class LogoutComponent {
   private _authService:AuthService = inject(AuthService);
   private _router : Router = inject(Router);

   constructor(){
     this._authService.changeUserLoggedInStatus(false);
     this._authService.removeLocalStorage("userId");
     this._router.navigate(["/"]);
   }
}
