import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class AdminComponent {

}
