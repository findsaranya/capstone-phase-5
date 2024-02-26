import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { ToastrService } from 'ngx-toastr';
import { ITheatreModalData, ITheatrePayload } from '../theatre.model';
import { TheatreService } from '../theatre.service';

@Component({
  selector: 'app-modal-theater-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule,
    MatIconModule,
  ],
  providers: [TheatreService],
  template: `
    <h2 mat-dialog-title>{{ 'Add Theatre' }}</h2>
    <mat-dialog-content>
      <form class="d-flex flex-column" [formGroup]="theaterForm">
        <input type="hidden" formControlName="id" />
        <mat-form-field>
          <mat-label>Theatre Name</mat-label>
          <input matInput placeholder="Eg.Fun Mall" formControlName="name" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Address</mat-label>
          <input
            matInput
            placeholder="Eg.125A North Street"
            formControlName="address"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Location</mat-label>
          <input matInput placeholder="Eg.Stockholm" formControlName="loc" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>City</mat-label>
          <input matInput placeholder="Eg.Delhi" formControlName="city" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Phone Number</mat-label>
          <input
            matInput
            placeholder="Eg.9234567890"
            formControlName="phoneNo"
          />
        </mat-form-field>
        <div class="row" formArrayName="ticketPrice">
          <mat-label>Seat Type</mat-label>
          <div
            class="row"
            *ngFor="let item of seatTypeFormArray.controls; let i = index"
            [formGroupName]="i"
          >
            <div class="col-md-4">
              <input type="hidden" formControlName="id" />
              <mat-form-field>
                <mat-label>Ticket Type</mat-label>
                <input
                  matInput
                  placeholder="Eg.King's Circle"
                  formControlName="type"
                />
              </mat-form-field>
            </div>
            <div class="col-md-4">
              <mat-form-field>
                <mat-label>Total Seats</mat-label>
                <input
                  matInput
                  placeholder="Eg.80"
                  type="number"
                  formControlName="totalSeats"
                />
              </mat-form-field>
            </div>
            <div class="col-md-4">
              <mat-form-field>
                <mat-label>Ticket Price</mat-label>
                <input
                  matInput
                  placeholder="Eg.300"
                  type="number"
                  formControlName="price"
                />
              </mat-form-field>
              <button
                mat-mini-fab
                *ngIf="i"
                color="primary"
                aria-label="Example icon button with a delete icon"
                (click)="removeSeatType(i)"
              >
                <mat-icon>delete</mat-icon>
              </button>
              <button
                mat-mini-fab
                *ngIf="!i"
                color="primary"
                aria-label="Example icon button with a delete icon"
                (click)="addSeatType()"
              >
                <mat-icon>add</mat-icon>
              </button>
            </div>
          </div>
        </div>
        <div class="row" formArrayName="showTimings">
          <mat-label>Show Timings</mat-label>
          <div
            class="row"
            *ngFor="let timings of showTimingsFormArray.controls; let j = index"
            [formGroupName]="j"
          >
            <div class="col-md-6">
              <input type="hidden" formControlName="id" />
              <input [ngxMatTimepicker]="picker" formControlName="showTime" />
              <ngx-mat-timepicker #picker ></ngx-mat-timepicker>
              <button
                mat-mini-fab
                *ngIf="j"
                class="ml-2"
                color="primary"
                aria-label="Example icon button with a delete icon"
                (click)="removeShowTimings(j)"
              >
                <mat-icon>delete</mat-icon>
              </button>
              <button
                mat-mini-fab
                *ngIf="!j"
                class="ml-2"
                color="primary"
                aria-label="Example icon button with a delete icon"
                (click)="addShowTimings()"
              >
                <mat-icon>add</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="float-end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button
        mat-raised-button
        color="primary"
        (click)="onSubmit()"
        [disabled]="theaterForm.invalid"
      >
        {{ 'Save' }}
      </button>
    </mat-dialog-actions>
  `,
})
export class ModalTheaterFormComponent implements OnInit {
  modalData = inject<ITheatreModalData>(MAT_DIALOG_DATA);
  theaterForm = this._fb.group({
    id: [0],
    name: ['', Validators.required],
    address: ['', Validators.required],
    loc: ['', Validators.required],
    city: ['', Validators.required],
    phoneNo: ['', Validators.required],
    ticketPrice: this._fb.array([]),
    showTimings: this._fb.array([]),
  });

  private _dialogRef = inject(MatDialogRef);
  private _theatreService = inject(TheatreService);
  private _toastr: ToastrService = inject(ToastrService);

  get seatTypeFormArray(): FormArray {
    return this.theaterForm.get('ticketPrice') as FormArray;
  }

  get showTimingsFormArray(): FormArray {
    return this.theaterForm.get('showTimings') as FormArray;
  }

  constructor(private _fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    if (this.modalData?.editMode) {
      this.intializeForm();
    } else {
      alert();
      this.addSeatType();
      this.addShowTimings();
    }
    console.log('form', this.seatTypeFormArray, this.showTimingsFormArray);
  }

  addSeatType(): void {
    this.seatTypeFormArray.push(this.newSeatType());
  }

  addShowTimings(): void {
    this.showTimingsFormArray.push(this.newShowTimings());
  }

  removeSeatType(index: number) {
    this.seatTypeFormArray.removeAt(index);
  }

  removeShowTimings(index: number) {
    this.showTimingsFormArray.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.theaterForm.value);
    const payload: ITheatrePayload = this.theaterForm.value as ITheatrePayload;

    this._theatreService.createTheatre(payload).subscribe({
      next: () => {
        this._toastr.success('Genre added Successfully');
        this._dialogRef.close('success');
        this.theaterForm.reset();
      },
      error: () => {
        this._toastr.error('Try after sometime');
      },
    });
  }

  intializeForm(): void {
    const {
      id,
      city,
      loc,
      name,
      phoneNo,
      showTimings,
      ticketPrice,
      address = '',
    } = this.modalData.theatreDetails;
    ticketPrice.forEach(() => this.addSeatType());
    showTimings.forEach(() => this.addShowTimings());

    this.theaterForm.setValue({
      id: id as number,
      city,
      loc,
      name,
      address,
      phoneNo,
      showTimings,
      ticketPrice,
    });
  }

  private newSeatType(): FormGroup {
    return this._fb.group({
      id: [0],
      type: ['', Validators.required],
      totalSeats: [0, Validators.required],
      price: [0, Validators.required],
    });
  }

  private newShowTimings(): FormGroup {
    return this._fb.group({
      id: [0],
      showTime: ['', Validators.required],
    });
  }
}
