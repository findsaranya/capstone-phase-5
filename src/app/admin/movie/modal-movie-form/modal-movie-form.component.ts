import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { IGenre, IMovie, ITheatre } from 'src/app/shared';
import { IMovieForm, IMovieModalData } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-modal-movie-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule
  ],
  template: `
  <h2 mat-dialog-title>{{ dialogData.isEditMode ? 'Update Movie':'Add Movie' }}</h2>
    <mat-dialog-content>
      <form class="d-flex flex-column" [formGroup]="movieForm">
        <input type="hidden" formControlName="id" />
        <mat-form-field>
          <mat-label>Movie Name</mat-label>
          <input matInput placeholder="Eg.Fun Mall" formControlName="name" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Language</mat-label>
          <mat-select formControlName="language">
    <mat-option>None</mat-option>
    <mat-option value="Hindi">HINDI</mat-option>
    <mat-option value="Kannada">KANNADA</mat-option>
    <mat-option value="Tamil">TAMIL</mat-option>
  </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Genre</mat-label>
          <mat-select formControlName="genre" [compareWith]="compareWithGenreData">
    <mat-option>None</mat-option>
    <mat-option [value]="genre" *ngFor="let genre of dialogData.genreList">{{genre.name | titlecase}}</mat-option>
   
  </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Description</mat-label>
          <textarea matInput placeholder="Eg.Description" formControlName="description"></textarea>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Theaters</mat-label>
          <mat-select formControlName="movieTheater" [compareWith]="compareWithTheaterData" multiple>
    <mat-option>None</mat-option>
    <mat-option [value]="theater" *ngFor="let theater of dialogData.theaterList">{{theater.name | titlecase}}</mat-option>
   
  </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="float-end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button
        mat-raised-button
        color="primary"
        (click)="onSubmit()"
        [disabled]="movieForm.invalid"
      >
        {{ dialogData.isEditMode ?'Update' : 'Save' }}
      </button>
    </mat-dialog-actions>
  
  `,
  styles: [],
})
export class ModalMovieFormComponent implements OnInit {

  movieForm = this._fb.group<IMovieForm>({
    id:this._fb.control(0),
    name: this._fb.control("",[Validators.required]),
  language:this._fb.control("",[Validators.required]),
  description: this._fb.control(""),
  genre:this._fb.control(null,[Validators.required]),
  movieTheater:this._fb.control([],[Validators.required])
  },{
    updateOn:"blur"
  }) ;
 dialogData = inject<IMovieModalData>(MAT_DIALOG_DATA);
 private movieService = inject(MovieService);
 private _dialogRef = inject(MatDialogRef);
  private _toastr = inject(ToastrService);

  constructor(private _fb:NonNullableFormBuilder){}
  ngOnInit(): void {
   if(this.dialogData.isEditMode && this.dialogData.formData) {
    const {id,name,description,genre,language,movieTheater} = this.dialogData.formData
    this.movieForm.setValue(this.dialogData.formData)
   }
  }

  onSubmit():void{
   console.log(this.movieForm.value);
   this.movieService.createMovie(this.movieForm.value as IMovie).subscribe({
    next: () => {
      this._toastr.success('Genre added Successfully');
      this._dialogRef.close('success');
      this.movieForm.reset();
    },
    error: () => {
      this._toastr.error('Try after sometime');
    },
  });
  }

  compareWithGenreData(genreOne: IGenre,genreTwo: IGenre): boolean {
    return (
        genreOne &&
        genreTwo &&
        genreOne.name === genreTwo.name &&
        genreOne.id === genreTwo.id
    );
}

compareWithTheaterData(theaterOne: ITheatre,theaterTwo: ITheatre): boolean {
  return (
      theaterOne &&
      theaterTwo &&
      theaterOne.name === theaterTwo.name &&
      theaterOne.id === theaterTwo.id
  );
}

}
