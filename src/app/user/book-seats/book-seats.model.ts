import { IAPIResponse, IMovie, IShowTiming, ITheatre, ITicketPrice } from 'src/app/shared';

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
  bookedSeats : ISeatInfo[],
  movieInfo :IMovie
  movieTheaterInfo : IMovieTheaterInfo
}

export interface IBookedSeatsPayload {
  movieId: number;
  theaterId: number;
  showTime: string;
  showDate: Date;
}

export interface IBookedSeats {
  id: number;
  theaterId: number;
  movieId: number;
  seatNo: string;
  showTime: string;
  showDate: Date;
  seatType:string;
}

export interface IBookedSeatsResponse extends IAPIResponse<IBookedSeats[]>{
  data : IBookedSeats[];
}

export interface ICreateSeatsResponse extends IAPIResponse<String>{
  data:string;
}
