import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IMovieTheaterInfo, ISeatInfo } from './book-seats.model';
import { IMovie, ITicketPrice } from 'src/app/shared';
import { SeatComponent } from './seat.component';
import { SeatPipe } from './seat.pipe';

@Component({
  selector: 'app-book-seats',
  standalone: true,
  imports: [CommonModule,SeatComponent,SeatPipe],
  templateUrl: './book-seats.component.html',
  styleUrls: ['./book-seats.component.scss']
})
export class BookSeatsComponent implements OnInit {
  movieTheaterInfo :IMovieTheaterInfo| null = null;
  movieInfo: IMovie | null = null;
  bookedSeats :ISeatInfo[] = [];
  private _router = inject(Router);
 constructor(){
  this.movieTheaterInfo = this._router.getCurrentNavigation()?.extras?.state?.['theaterInfo'] || null;
  this.movieInfo = this._router.getCurrentNavigation()?.extras.state?.['movie'] || null;
 }

 bookSeats(seatInfo:ISeatInfo):void{
 if(this.bookedSeats.findIndex(item => item.seatNo === seatInfo.seatNo) === -1){
    this.bookedSeats.push({...seatInfo})
 }else{
  const filteredSeats = this.bookedSeats.filter(seat => seat.seatNo !== seatInfo.seatNo);
  this.bookedSeats = filteredSeats;
 }
 }

 navigateToPayment():void{
  const bookedDetails = {
    movie : this.movieInfo?.name || "",
    theater : this.movieTheaterInfo?.theater.name || "",
    noOfSeats : this.bookedSeats.map(item => item.seatNo).join(", ") || "",
    seatTypes : this.movieTheaterInfo?.theater?.ticketPrice.map(type => type.type).join(",") || "",
    ticketPrice : this.movieTheaterInfo?.theater.ticketPrice.map(({price}) => price ).join(", ") || "",
    totalCost : this.bookedSeats.reduce((total,seatPrice) => total+Math.round(seatPrice.price) ,0)
  }
  console.log(bookedDetails)
  this._router.navigate(["/payment"],{
    state : {bookedDetails}
  })
 }
 ngOnInit(): void {
     console.log(this.movieTheaterInfo);
 }
}
