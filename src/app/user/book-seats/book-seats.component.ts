import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/shared';
import { IBookedSeatsPayload, IMovieTheaterInfo, ISeatInfo } from './book-seats.model';
import { SeatComponent } from './seat.component';
import { SeatPipe } from './seat.pipe';
import { BookedSeatService } from './book-seats.service';

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
  seatNos :string[] = [];
  private _router = inject(Router);
  private _seatService = inject(BookedSeatService);


 constructor(){
  this.movieTheaterInfo = this._router.getCurrentNavigation()?.extras?.state?.['theaterInfo'] || null;
  this.movieInfo = this._router.getCurrentNavigation()?.extras.state?.['movie'] || null;
  this.getbookedSeats();
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
    totalCost : this.bookedSeats.reduce((total,seatPrice) => total+Math.round(seatPrice.price) ,0),
    bookedSeats:this.bookedSeats,
    movieInfo : this.movieInfo,
    movieTheaterInfo : this.movieTheaterInfo
  }
  console.log(bookedDetails)
  this._router.navigate(["/payment"],{
    state : {bookedDetails}
  })
 }

 
 ngOnInit(): void {
     console.log(this.movieTheaterInfo);
 }




private getbookedSeats():void{
  const payload:IBookedSeatsPayload = {
    movieId : this.movieInfo?.id || 0,
    showDate: new Date(),
    showTime: this.movieTheaterInfo?.showTiming.showTime || "",
    theaterId: this.movieTheaterInfo?.theater.id || 0,
  }
  
  this._seatService.getBookedSeats(payload).subscribe({
    next : bookedSeatsList => {
      this.seatNos = bookedSeatsList.map(seat => seat.seatNo);
      console.log(this.seatNos)
    },
    error : () => this.seatNos = []
  })
   }
}