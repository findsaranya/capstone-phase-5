import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: ``,
})
export class LogoutComponent {
  private _authService:AuthService = inject(AuthService);
  private _router : Router = inject(Router);
  private _toastr: ToastrService = inject(ToastrService);
  constructor(){
    this._authService.changeAdminLoggedInStatus(false);
    this._authService.removeLocalStorage("adminId");
    this._toastr.success("Logged out Successfully")
    this._router.navigate(["/admin/login"]);
  }
}
