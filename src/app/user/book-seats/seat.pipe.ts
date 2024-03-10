import { Pipe, PipeTransform } from '@angular/core';
import { ITicketPrice } from 'src/app/shared';

@Pipe({name: 'seatPipe',standalone:true})
export class SeatPipe implements PipeTransform {
    transform(value: ITicketPrice): Array<number> {
        const seatRows = []
        for (let i=0;i<value.totalSeats ;i++) {
            seatRows.push(i+1);
         }
         return seatRows;
    }
}