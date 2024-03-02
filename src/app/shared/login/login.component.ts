import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { ILoginForm } from '../shared.model';

@Component({
  selector: 'shared-login',
  standalone: true,
  imports: [NgIf,NgClass,ReactiveFormsModule,RouterLinkWithHref],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class SharedLoginComponent {
  loginForm = this._fb.group({
    email : [null,[Validators.required,Validators.email]],
    password : [null , Validators.required]
  });

  @Output() loginFromEmit = new EventEmitter<ILoginForm>();
  constructor(private _fb:FormBuilder){}



  onSubmit():void{

    if (this.loginForm.valid) {
      console.log(this.loginForm);
    
      this.loginFromEmit.next({
        email:this.loginForm.value.email || " ",
        password:this.loginForm.value.password || ""
      });
    } else {
      Object.values(this.loginForm.controls).forEach(
        (control: AbstractControl) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        }
      );
    }
   
  }

}
