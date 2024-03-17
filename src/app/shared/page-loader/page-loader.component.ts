import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-page-loader',
  standalone: true,
  imports: [CommonModule],
  template: ` 
  <div class="d-flex justify-content-center align-items-center loader-container" *ngIf="isPageLoading">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  
  `,
  styles: [
    `
      .loader-container {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: white;
      }
    `,
  ],
})
export class PageLoaderComponent {
  @Input() isPageLoading = false;
}
