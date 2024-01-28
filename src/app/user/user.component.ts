import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from '../shared';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, RouterLinkWithHref, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
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
  `
})
export class UserComponent {}
