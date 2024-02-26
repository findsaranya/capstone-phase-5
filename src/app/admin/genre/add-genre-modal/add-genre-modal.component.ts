import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { IGenreModalData, IGenrePayload } from '../genre.model';
import { GenreService } from '../genre.service';

@Component({
  selector: 'app-add-genre-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  template: `
    <h2 mat-dialog-title>{{modalData?.editMode ? "Edit Genre" : "Add Genre"}}</h2>
    <mat-dialog-content>
      <form [formGroup]="genreForm">
       <input type="text" hidden formControlName="genreId"/>
        <mat-form-field>
          <mat-label>Genre Name</mat-label>
          <input matInput placeholder="Eg.Romance" formControlName="genre" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="float-end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [disabled]="genreForm.invalid" (click)="onSubmit()">{{
        modalData?.editMode ? "Update" : "Save"
      }}</button>
    </mat-dialog-actions>
  `,
})
export class AddGenreModalComponent implements OnInit {
  genreForm = this._fb.group({
       genre : ["" , Validators.required],
       genreId:[0]
  });
   modalData = inject<IGenreModalData>(MAT_DIALOG_DATA);

  private _dialogRef = inject(MatDialogRef);
  private _genreService:GenreService = inject(GenreService);
  private _toastr:ToastrService = inject(ToastrService);

  constructor( private _fb: NonNullableFormBuilder){}

  ngOnInit(): void {
      if(this.modalData?.editMode && this.modalData?.name && this.modalData?.id){
        this.genreForm.setValue({
          genre : this.modalData.name,
          genreId : this.modalData.id
        })
      }
  }

  onSubmit():void{
    
    const payload:IGenrePayload = {
      name : this.genreForm.value.genre || ""
    }

    if(this.modalData?.editMode) {
       payload.id = this.genreForm.value.genreId
    }
    this._genreService.createGenre(payload).subscribe({
      next : () => {
        this._toastr.success("Genre added Successfully");
        this._dialogRef.close("success");
        this.genreForm.reset();
      },
      error : () => {
        this.genreForm.reset();
        this._toastr.error("Try after sometime");
      }
    });
  }
}
