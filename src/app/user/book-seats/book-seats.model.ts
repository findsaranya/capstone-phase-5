import { IShowTiming, ITheatre, ITicketPrice } from 'src/app/shared';

export interface IMovieTheaterInfo {
  theater: ITheatre;
  showTiming: IShowTiming;
}

export interface ISeatInfo extends ITicketPrice {
  seatNo: string;
}

export interface IBookedDetails {
  movie: string;
  theater: string;
  noOfSeats: string;
  seatTypes: string;
  ticketPrice: string;
  totalCost: number;
}
