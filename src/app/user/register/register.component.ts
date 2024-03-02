import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLinkWithHref } from '@angular/router';
import { IRegistrationForm } from './register.model';
import { RegisterService } from './register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core';
import { IUser } from 'src/app/shared';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLinkWithHref
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this._fb.group<IRegistrationForm>({
    id : this._fb.control(0),
    email:this._fb.control("",[Validators.required,Validators.email]),
    location:this._fb.control("",[Validators.required,Validators.pattern('^[a-zA-Z\s]*$')]),
    name:this._fb.control("",[Validators.required,Validators.pattern('^[a-zA-Z\s]*$')]),
    password:this._fb.control("",[Validators.required,Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20}$")]),
    phoneNo:this._fb.control("",[Validators.required,Validators.pattern("^[+]?(\\d{1,2})?[\\s.-]?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$")]),
  });
private _regService = inject(RegisterService);
private _toastr = inject(ToastrService);
private _authService = inject(AuthService);
private _router = inject(Router);
  constructor(private _fb:NonNullableFormBuilder){}

  onSubmit():void{
    this._regService.createUser(this.registerForm.value as IUser).subscribe({
      next:(response) => {
        this._authService.changeUserLoggedInStatus(true);
        this._authService.user = response;
        this._authService.setLocalStorage("userId",JSON.stringify(this._authService.user.id));
        this._toastr.success("...Redirecting to dashboard","Registration Successfully",);
        this._router.navigate(["/movies"]);
      },
      error : (err:HttpErrorResponse) => {
        console.log(err,Object.keys(err.error),err.error);
        const errorkeys = Object.keys(err.error);
        const formControls = Object.keys(this.registerForm.value);
        if(formControls.some(x => errorkeys.findIndex((_) => x)!== -1)){
          for (const [keys,values] of Object.entries(err.error)) {
            if(formControls.includes(keys)){
              this.registerForm.get(keys)?.setErrors({incorrect:true});
            }
          }
        }else{
          this._toastr.error(err.error.message);
        }     
       
      } 
    });

  }
}
