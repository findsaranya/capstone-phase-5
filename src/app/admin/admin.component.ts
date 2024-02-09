import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent, FooterComponent } from '../shared';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,AdminHeaderComponent,FooterComponent],
  template: `
    <shared-admin-header></shared-admin-header>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <section style="min-height:84vh;">
          <router-outlet></router-outlet>
          </section>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: [
  ]
})
export class AdminComponent {

}
