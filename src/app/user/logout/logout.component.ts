import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  template:""
})
export class LogoutComponent {
   private _authService:AuthService = inject(AuthService);
   private _router : Router = inject(Router);
   private _toastr: ToastrService = inject(ToastrService);
   constructor(){
     this._authService.changeUserLoggedInStatus(false);
     this._authService.removeLocalStorage("userId");
     this._router.navigate(["/"]);
     this._toastr.success("Logged out Successfully")
   }
}
