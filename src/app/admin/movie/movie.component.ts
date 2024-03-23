import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of, tap } from 'rxjs';
import { IGenre, IMovie, ITheatre } from 'src/app/shared';
import { environment } from 'src/environments/environment.development';
import { GenreService } from '../genre';
import { TheatreService } from '../theatre';
import { ModalMovieFormComponent } from './modal-movie-form/modal-movie-form.component';
import { IMovieModalData } from './movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule,MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  displayedColumns = ['id', 'name', 'language', 'genre','action'];
  dataSource$: Observable<IMovie[]> = of([]);
  pagination = {
    totalPages: 0,
    size: environment.pageSize,
    pageIndex: 0,
  };
  genreList :IGenre[] = [];
  theaterList : ITheatre[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _toastr: ToastrService = inject(ToastrService);
  private theaterService = inject(TheatreService);
  private genreService = inject(GenreService);
  private movieService = inject(MovieService);

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAll();
    this.getGenreList();
    this.getTheaterList();
  }


  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this.getAll())).subscribe();
  }

 
  openModal(): void {
    const modalData : IMovieModalData = {
      genreList : this.genreList,
      theaterList : this.theaterList,
      formData : null,
      isEditMode:false
    }
    const dialogRef = this.dialog.open(ModalMovieFormComponent, {
      disableClose: true,
      width:'750px',
      data : modalData
    });

    dialogRef.afterClosed().subscribe((closeResult) => {
      if (closeResult === 'success') {
        this.getAll(true);
      }
    });
  }

  onEdit(movie:IMovie):void{
    const modalData : IMovieModalData = {
      genreList : this.genreList,
      theaterList : this.theaterList,
      formData : {...movie},
      isEditMode:true   }
    const dialogRef = this.dialog.open(ModalMovieFormComponent, {
      disableClose: true,
      width:'750px',
      data : modalData
    });

    dialogRef.afterClosed().subscribe((closeResult) => {
      if (closeResult === 'success') {
        this.getAll(true);
      }
    });
  }

  onDelete(movie:IMovie):void{
    let confirmResult = confirm("Are you sure?");
    if(confirmResult){
      this.movieService.deleteMovie(movie.id).subscribe({
        next:() => {
          this.getAll(true);
          this._toastr.success("Movie deleted successfully");
          
        },
        error:() => {
          this._toastr.error("Try after sometime");
        }
      })
    }
  }

  private getAll(intialLoad = false): void {
    const payload = {
      page: intialLoad
        ? this.pagination.pageIndex
        : this.paginator?.pageIndex || this.pagination.pageIndex,
      size: intialLoad
        ? this.pagination.size
        : this.paginator?.pageSize || this.pagination.size,
    };
   this.dataSource$ = this.movieService.getMovies(payload).pipe(
      map((response) => {
        this.pagination.totalPages = response.totalItems;
        return response.movies;
      })
    );
  }

  private getGenreList():void{
    this.genreService.getGenres().subscribe({
      next : genresList => this.genreList = genresList,
      error : () => this.genreList = []
    })
  }

  private getTheaterList():void{
    this.theaterService.getTheaters().subscribe({
      next :theatersList => this.theaterList = theatersList,
      error:() => this.theaterList=[]
    })
  }
}
