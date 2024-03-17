import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, debounceTime, finalize, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IGenre, IMovie, IMovieSearchPayload, MovieCardComponent, PageLoaderComponent } from 'src/app/shared';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { SharedService } from 'src/app/shared/';
import { GenreService } from 'src/app/admin/genre';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,MovieCardComponent,ReactiveFormsModule,PageLoaderComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  isPageLoading = false;
  dataSource$: Observable<IMovie[]> = of([]);
  genreSource$ : Observable<IGenre[]> = of([]);
  genreId  = 0;
  searchName = ""
  pagination = {
    totalPages: 0,
    size: environment.pageSize,
    pageIndex: 0,
  };
  searchForm = this._fb.group({
    movieName : [""],
    genre : [""]
  })
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _sharedService = inject(SharedService);
  private genreService = inject(GenreService);
  private _router = inject(Router);

  constructor(private _fb:NonNullableFormBuilder){}
  ngOnInit(): void {
    this.searchMovies(true);
    this.getGenreList();
    this.searchForm.controls['movieName'].valueChanges.pipe(debounceTime(2000)).subscribe({
      next : (val) =>{
        this.searchName = val
        this.paginator.firstPage();
        this.searchMovies(true);
      }
    })
    this.searchForm.controls['genre'].valueChanges.subscribe({
      next : (val) => {
        console.log(val)
        this.genreId = parseInt(val);
        this.paginator.firstPage();
        this.searchMovies(true);
      }
    })

  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this.searchMovies())).subscribe();
  }
  
  bookTickets(movie:IMovie):void{
    this._router.navigate([
      "/book-tickets"],
      {
       state : {movie}
      }
    );
  }

  resetSearch():void{
    this.searchForm.reset();
    this.genreId=0;
    this.searchName = "";
    this.paginator.firstPage();
  }
  private getGenreList():void{
   this.genreSource$ =  this.genreService.getGenres();
  }

  private searchMovies(intialLoad = false):void{
    const payload : IMovieSearchPayload = {
      page: intialLoad
      ? this.pagination.pageIndex
      : this.paginator?.pageIndex || this.pagination.pageIndex,
    size: intialLoad
      ? this.pagination.size
      : this.paginator?.pageSize || this.pagination.size,
      genreId : this.genreId,
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
