import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from 'src/app/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-admin-header',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
  authService = inject(AuthService);

}
