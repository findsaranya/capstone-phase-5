import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITicketPrice } from 'src/app/shared';
import { ISeatInfo } from './book-seats.model';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-seat-name',
    standalone:true,
    imports:[NgClass],
    template : `
    <div class="seats mx-1 my-1" [ngClass]="{'bg-secondary': isVisited ,'bg-success' : !isVisited,'disabled-btn':isBooked}" (click)="checkSeat()"></div>
    `,
    styleUrls: ['./book-seats.component.scss']
})
export class SeatComponent implements OnInit {
    @Input() seatInfo : ITicketPrice | null = null;
    @Input() seatNo = '';
    @Input() disabled = false;
    @Input() isBooked = false;
    @Output() onSeatbooking = new EventEmitter<ISeatInfo>();
    get isVisited():boolean{
        return this._isVisited;
    }
    set isVisited(val:boolean){
        this._isVisited = val;
    }
   private _isVisited = false;
    constructor() { }

    ngOnInit(): void { }

    checkSeat():void{
        if(!this.disabled && this.seatInfo !== null){
            this.isVisited = !this.isVisited;
            this.onSeatbooking.emit({seatNo:this.seatNo,...this.seatInfo})
        }
       
    }
}
