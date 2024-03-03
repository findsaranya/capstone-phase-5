import { Component,OnInit,ViewChild,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { GenreService } from 'src/app/admin/genre';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { IGnereMoviesPayload, MovieService } from 'src/app/admin/movie';
import { environment } from 'src/environments/environment.development';
import { IGenre, IMovie, MovieCardComponent } from 'src/app/shared';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-gere-movies',
  standalone: true,
  imports: [CommonModule,RouterLinkWithHref, MatPaginatorModule,MovieCardComponent],
  templateUrl: './gere-movies.component.html',
  styleUrls: ['./gere-movies.component.scss']
})
export class GereMoviesComponent implements OnInit{
  dataSource$: Observable<IMovie[]> = of([]);
  genreId = '';
  pagination = {
    totalPages: 0,
    size: environment.pageSize,
    pageIndex: 0,
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
private _route = inject(ActivatedRoute);
private _genreService = inject(GenreService);
private _movieService = inject(MovieService);
private _genre:IGenre | null = null;

ngOnInit(): void {

   this._route.params.pipe(
        tap(genreId =>{
          this.genreId = genreId['genreId'];
          this.getGenreMovies(true);
        }),
        // switchMap(params =>  this._genreService.getGenreById(params['genreId']).pipe(tap(genResponse => this._genre=genResponse)    
        // ,switchMap(genre => {
        //   const payload:IGnereMoviesPayload = {
        //     genre,
        //     page:0,
        //     size:environment.pageSize
        //   }
        //   return this._movieService.getMoviesByGenre(payload).pipe(map(movieList => movieList.movies))
        // })))
      ).subscribe()
    
    
}

ngAfterViewInit(): void {
  this.paginator.page.pipe(tap(() => this.getGenreMovies())).subscribe();
}

bookTickets(movie:IMovie):void{
  console.log(movie);
}

private getGenreMovies(intialLoad = false):void{

  this.dataSource$ = this._genreService.getGenreById(this.genreId).pipe(
    switchMap(genre => {
      const payload:IGnereMoviesPayload = {
        genre,
        page: intialLoad
        ? this.pagination.pageIndex
        : this.paginator?.pageIndex || this.pagination.pageIndex,
      size: intialLoad
        ? this.pagination.size
        : this.paginator?.pageSize || this.pagination.size,
      }
      console.log("payload",payload);
      return this._movieService.getMoviesByGenre(payload).pipe(map(movieList => {
        this.pagination.totalPages = movieList.totalItems; 
        return movieList.movies
      }))
    }
   ));
 
 
}
}
