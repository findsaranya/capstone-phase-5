import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { MovieService } from 'src/app/admin/movie';
import { IMovie, MovieCardComponent } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MovieCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  recentMovies$ :Observable<IMovie[]> = of([]);
  private _movieService = inject(MovieService);
  private _router = inject(Router);
  
  ngOnInit(): void {
    this.recentMovies$ = this._movieService.getRecentMovies();
  }
  
  bookTickets(movie:IMovie):void{
    this._router.navigate([
      "/book-tickets"],
      {
       state : {movie}
      }
    );
  }
}
