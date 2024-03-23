import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core';
import { SharedLoginComponent } from 'src/app/shared';
import { ILoginForm } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,SharedLoginComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFailure = false;
  errorMsg = "";
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _toastr: ToastrService = inject(ToastrService);

  onSubmit(loginDetails : ILoginForm):void{
    this._authService.userLogin(loginDetails).subscribe({
      next : (response) => {
        this.loginFailure = false;
        this._authService.changeUserLoggedInStatus(true);
        this._authService.user = response;
        this._authService.setLocalStorage("userId",JSON.stringify(this._authService.user.id));
        this._toastr.success("Success","You are LoggedIn");
        this._router.navigate(["/dashboard"]);
      },
      error : (err:HttpErrorResponse) => {
        this.errorMsg = err.error.message
        this.loginFailure=true;

      }
    });
  }
}
