import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core';
import { ILoginForm, SharedLoginComponent } from 'src/app/shared';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedLoginComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFailure = false;
  errorMsg = "";
  private _authService = inject(AuthService);
  private _router = inject(Router);

  onSubmit(loginDetails : ILoginForm):void{
    this._authService.userLogin(loginDetails).subscribe({
      next : (response) => {
        this.loginFailure = false;
        this._authService.changeAdminLoggedInStatus(true);
        this._authService.admin = response;
        this._authService.setLocalStorage("adminId",JSON.stringify(this._authService.admin.id));
        this._router.navigate(["/admin"]);
      },
      error : (err:HttpErrorResponse) => {
        console.log(err);
        this.errorMsg = err.error.message
        this.loginFailure=true;

      }
    });
  }
}
