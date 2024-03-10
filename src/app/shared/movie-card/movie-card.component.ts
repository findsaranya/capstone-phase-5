import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovie } from '../shared.model';

@Component({
  selector: 'shared-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
@Input() movie :IMovie|null = null;
@Input()showBookingBtn = false;
@Output() onBookTicket = new EventEmitter<IMovie>();

bookTicket():void{
  if(this.movie) this.onBookTicket.emit(this.movie);
}
}
