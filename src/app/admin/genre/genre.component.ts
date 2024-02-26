import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of, tap } from 'rxjs';
import { AddGenreModalComponent } from './add-genre-modal/add-genre-modal.component';
import { IGenreModalData } from './genre.model';
import { GenreService } from './genre.service';
import { IGenre } from 'src/app/shared';

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatDialogModule,MatPaginatorModule],
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit,AfterViewInit {
  displayedColumns = ['id', 'name', 'action'];
  dataSource$: Observable<IGenre[]> = of([]);
  pagination = {
    totalPages:0,
    size:10,
    pageIndex:0
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _genreService: GenreService = inject(GenreService);
  private _toastr:ToastrService = inject(ToastrService);

  constructor(public dialog: MatDialog) {}
  ngAfterViewInit(): void {
    this.paginator.page
    .pipe(
        tap(() => this.getAllGenres())
    )
    .subscribe();
  }

  ngOnInit(): void {
    this.getAllGenres();
  }

  onEdit(genre:IGenre): void {
    const modalData:IGenreModalData = {
      ...genre,editMode:true
    };

    const dialogRef = this.dialog.open(AddGenreModalComponent, {
      disableClose: true,
      data : modalData
    });

    dialogRef.afterClosed().subscribe((closeResult) => {
      if (closeResult === 'success') {
        this.getAllGenres(true);
      }
    });
  }

  onDelete(genre:IGenre): void {
    let confirmResult = confirm("Are you sure?");
    if(confirmResult){
      this._genreService.deleteGenre(genre).subscribe({
        next:() => {
          console.log("delted");
          this.getAllGenres(true);
          this._toastr.success("Genre deleted successfully");
          
        },
        error:() => {
          this._toastr.error("Try after sometime");
        }
      })
    }
  }

  openModal(): void {
    const dialogRef = this.dialog.open(AddGenreModalComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((closeResult) => {
      if (closeResult === 'success') {
        this.getAllGenres(true);
      }
    });
  }


  private getAllGenres(intialLoad=false):void{
    const payload = {
      page : intialLoad ?this.pagination.pageIndex: this.paginator?.pageIndex || this.pagination.pageIndex,
      size:intialLoad ? this.pagination.size : this.paginator?.pageSize || this.pagination.size
    };
    this.dataSource$ = this._genreService.getAllGenres(payload).pipe(map(response => {
      this.pagination.totalPages = response.totalItems
      return response.genreList
    }));
  }
}
