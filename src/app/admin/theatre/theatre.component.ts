import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of, tap } from 'rxjs';
import { ITheatre } from 'src/app/shared';
import { environment } from 'src/environments/environment.development';
import { ModalTheaterFormComponent } from './modal-theater-form/modal-theater-form.component';
import { TheatreService } from './theatre.service';
import { ITheatreModalData } from './theatre.model';

@Component({
  selector: 'app-theatre',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.scss'],
})
export class TheatreComponent implements AfterViewInit,OnInit {
  displayedColumns = ['id', 'name', 'loc', 'city', 'phoneNo','action'];
  dataSource$: Observable<ITheatre[]> = of([]);
  pagination = {
    totalPages: 0,
    size: environment.pageSize,
    pageIndex: 0,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _toastr: ToastrService = inject(ToastrService);
  private _thetareService = inject(TheatreService);

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAll();
  }
  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this.getAll())).subscribe();
  }
  openModal(): void {
    const dialogRef = this.dialog.open(ModalTheaterFormComponent, {
      disableClose: true,
      width:'750px'
    });

    dialogRef.afterClosed().subscribe((closeResult) => {
      if (closeResult === 'success') {
        this.getAll(true);
      }
    });
  }

  onEdit(theater:ITheatre):void{
   console.log(theater);
   const modalData:ITheatreModalData = {
    theatreDetails : {...theater},
    editMode : true
   }

   const dialogRef = this.dialog.open(ModalTheaterFormComponent,{
    disableClose:true,
    data : modalData
   });
   dialogRef.afterClosed().subscribe(val =>{
    if(val === "success"){
      this.getAll(true);
    }
   })
  }

  onDelete(theatre:ITheatre):void{
    let confirmResult = confirm("Are you sure?");
    if(confirmResult){
      this._thetareService.deleteTheatre(theatre.id || 0).subscribe({
        next:() => {
          console.log("delted");
          this.getAll(true);
          this._toastr.success("Genre deleted successfully");
          
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
    this.dataSource$ = this._thetareService.getAllTheatre(payload).pipe(
      map((response) => {
        this.pagination.totalPages = response.totalItems;
        return response.theatreList;
      })
    );
  }
}
