import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedLoginComponent } from 'src/app/shared';
import { ILoginForm } from 'src/app/shared/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,SharedLoginComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  onSubmit(loginDetails : ILoginForm):void{
    console.log("emit",loginDetails);
  }
}
