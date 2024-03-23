import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBookedDetails, IBookedSeats, IBookedSeatsPayload } from '../book-seats/book-seats.model';
import { Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPaymentForm } from './payment.model';
import { ToastrService } from 'ngx-toastr';
import { BookedSeatService } from '../book-seats/book-seats.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
 bookedDetails:IBookedDetails | null = null;
 paymentForm = this._fb.group<IPaymentForm>({
  total : this._fb.control(0,Validators.required),
  cardNo : this._fb.control("",[Validators.required,Validators.pattern('\d{16}')]),
  cvv:this._fb.control("",[Validators.required,Validators.pattern('\d{3}')]),
  expiryDate:this._fb.control("",[Validators.required,Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$')])
 });

 seatNos :string[] = [];

 private _router = inject(Router);
 private _toastr = inject(ToastrService);
 private _seatService = inject(BookedSeatService);


 constructor(private _fb:NonNullableFormBuilder){
  this.bookedDetails = this._router.getCurrentNavigation()?.extras.state?.['bookedDetails'] || null;
  this.paymentForm.patchValue({
    total : this.bookedDetails?.totalCost
  })
 }
  ngOnInit(): void {
    
  }

 onSubmit():void{
  this.bookTheSeats();
  
 }


 bookTheSeats():void{
  const payload: IBookedSeats[] = this.bookedDetails?.bookedSeats.map(bookedSeat => ({
    id : 0,
    movieId : this.bookedDetails?.movieInfo.id || 0,
    seatNo : bookedSeat.seatNo || "",
    showDate : new Date(),
    showTime : this.bookedDetails?.movieTheaterInfo?.showTiming.showTime || "",
    theaterId : this.bookedDetails?.movieTheaterInfo.theater.id || 0,
    seatType  : bookedSeat.type || ""
  })) || [];
  if(payload.length){
    this._seatService.bookSeats(payload).subscribe({
      next : () =>{
        this._toastr.success("Tickets has been booked Successfully");
        this._router.navigate(["/dashboard"]);
      },
      error : () => this._toastr.error("Ticket booking Failed","Try after sometime")
    })
  }
 
}


 }




