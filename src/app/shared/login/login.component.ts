import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILoginForm } from '../login.model';

@Component({
  selector: 'shared-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    console.log(this.loginForm);
    
    this.loginFromEmit.next({
      email:this.loginForm.value.email || " ",
      password:this.loginForm.value.password || ""
    });
  }

}
