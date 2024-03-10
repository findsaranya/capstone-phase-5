import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBookedDetails } from '../book-seats/book-seats.model';
import { Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPaymentForm } from './payment.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
 bookedDetails:IBookedDetails | null = null;
 paymentForm = this._fb.group<IPaymentForm>({
  total : this._fb.control(0,Validators.required),
  cardNo : this._fb.control("",[Validators.required,Validators.pattern('\d{16}')]),
  cvv:this._fb.control("",[Validators.required,Validators.pattern('\d{3}')]),
  expiryDate:this._fb.control("",[Validators.required,Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$')])
 });

 private _router = inject(Router);
 private _toastr = inject(ToastrService);

 constructor(private _fb:NonNullableFormBuilder){
  this.bookedDetails = this._router.getCurrentNavigation()?.extras.state?.['bookedDetails'] || null;
  this.paymentForm.patchValue({
    total : this.bookedDetails?.totalCost
  })
 }

 onSubmit():void{
  console.log(this.paymentForm);
  this._toastr.success("Ticket has been booked successfully!!");
  this._router.navigate(["/dashboard"]);
 }

}
