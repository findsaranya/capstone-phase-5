import { Component,OnInit,ViewChild,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { GenreService } from 'src/app/admin/genre';
import { Observable, debounceTime, finalize, map, of, switchMap, tap } from 'rxjs';
import { IGnereMoviesPayload, MovieService } from 'src/app/admin/movie';
import { environment } from 'src/environments/environment.development';
import { IGenre, IMovie, IMovieSearchPayload, MovieCardComponent, PageLoaderComponent, SharedService } from 'src/app/shared';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gere-movies',
  standalone: true,
  imports: [CommonModule,RouterLinkWithHref, MatPaginatorModule,MovieCardComponent,PageLoaderComponent,ReactiveFormsModule],
  templateUrl: './gere-movies.component.html',
  styleUrls: ['./gere-movies.component.scss']
})
export class GereMoviesComponent implements OnInit{
  dataSource$: Observable<IMovie[]> = of([]);
  genreId = 0;
  pagination = {
    totalPages: 0,
    size: environment.pageSize,
    pageIndex: 0,
  };
  searchName = ""
  isPageLoading = false;
  searchForm = this._fb.group({
    movieName : [""],
    genre : [""]
  })
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private _fb:NonNullableFormBuilder){}
private _route = inject(ActivatedRoute);
private _genreService = inject(GenreService);
private _movieService = inject(MovieService);
private _sharedService = inject(SharedService);
private _genre:IGenre | null = null;
private _router = inject(Router);

ngOnInit(): void {
  this.searchForm.controls['movieName'].valueChanges.pipe(debounceTime(2000)).subscribe({
    next : (val) =>{
      this.searchName = val
      this.paginator.firstPage();
      this.searchMovies(true);
    }
  })
   this._route.params.pipe(
        tap(genreId =>{
          this.genreId = genreId['genreId'];
          this.searchMovies(true);
        }),
      ).subscribe()
    
    
}

ngAfterViewInit(): void {
  this.paginator.page.pipe(tap(() => this.searchMovies())).subscribe();
}

bookTickets(movie:IMovie):void{
  console.log(movie);
}

resetSearch():void{
  this.searchForm.reset();
  this.searchName = "";
  this.paginator.firstPage();
}



private searchMovies(intialLoad = false):void{
  const payload : IMovieSearchPayload = {
    page: intialLoad
    ? this.pagination.pageIndex
    : this.paginator?.pageIndex || this.pagination.pageIndex,
  size: intialLoad
    ? this.pagination.size
    : this.paginator?.pageSize || this.pagination.size,
    genreId : this.genreId ,
    name : this.searchName
  }
  console.log("paginator",this.paginator?.pageIndex,this.paginator)
  this.isPageLoading = true;
  this.dataSource$ = this._sharedService.searchMovies(payload).pipe(map(movieList => {
    this.pagination.totalPages = movieList.totalItems; 
    return movieList.movies
  }),finalize(() => this.isPageLoading = false));
 
 
}
}
