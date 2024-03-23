import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { IMovie, IShowTiming } from 'src/app/shared';
import { IBookTicketForm } from './book-tickets.model';

@Component({
  selector: 'app-book-tickets',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.scss'],
})
export class BookTicketsComponent implements OnInit {
  movieInfo: IMovie | null = null;
  bookTicketForm  = this._fb.group<IBookTicketForm>({
    theater : this._fb.control(null,Validators.required),
    showTiming : this._fb.control(null,Validators.required)
  });
  showTimings :IShowTiming[] = [];
  private _router = inject(Router);

  constructor(private _fb : NonNullableFormBuilder) {
    this.movieInfo =
      this._router.getCurrentNavigation()?.extras?.state?.['movie'] || null;
      this.showTimings = this.movieInfo ? this.movieInfo.movieTheater[0].showTimings : [];
  }

  ngOnInit(): void {
    if(!this.movieInfo){
      this._router.navigate(['/dashboard']);
      return;
    }
     this.bookTicketForm.controls['theater'].valueChanges.subscribe({
      next : value => this.showTimings = value?.showTimings || []
     })
  }

  onSubmit():void{
    this._router.navigate([
      "/book-seats"],
      {
       state : {theaterInfo : this.bookTicketForm.value,movie:this.movieInfo}
      }
    );
  }
 
}
