import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../movie';
import { Observable, of } from 'rxjs';
import { IMovie, MovieCardComponent } from 'src/app/shared';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MovieCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

recentMovies$ :Observable<IMovie[]> = of([]);
private _movieService = inject(MovieService);

ngOnInit(): void {
  this.recentMovies$ = this._movieService.getRecentMovies();
}

}
