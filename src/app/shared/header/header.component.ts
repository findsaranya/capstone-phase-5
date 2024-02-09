import { Component, inject } from '@angular/core';
import { CommonModule, NgIf, TitleCasePipe } from '@angular/common';
import { AuthService } from 'src/app/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf,RouterLink,TitleCasePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  authService:AuthService = inject(AuthService);
 
 logout():void{
  this.authService.removeLocalStorage("userId");
  this.authService.changeUserLoggedInStatus(false);
  
 }
}
