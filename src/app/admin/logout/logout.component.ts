import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: ``,
})
export class LogoutComponent {
  private _authService:AuthService = inject(AuthService);
  private _router : Router = inject(Router);

  constructor(){
    this._authService.changeAdminLoggedInStatus(false);
    this._authService.removeLocalStorage("adminId");
    this._router.navigate(["/admin/login"]);
  }
}
