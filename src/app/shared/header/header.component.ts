import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from 'src/app/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  authService = inject(AuthService);

}
