export interface ILoginForm {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  role: string;
  name: string;
  email: string;
  phoneNo: string;
  location: string;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IAPIResponse<T> {
  message: string;
  status: number;
  data: T;
}

export interface IGenre{
  id:   number;
  name: string;
}

export interface ITheatre {
  id?: number;
  name: string;
  city: string;
  loc: string;
  phoneNo: string;
  address: string;
  ticketPrice: ITicketPrice[];
  showTimings: IShowTiming[];
}

export interface IShowTiming {
  id?: number;
  showTime: string;
}

export interface ITicketPrice {
  id?: number;
  totalSeats: number;
  type: string;
  price: number;
}

export interface IMovie {
  id:number;
  name:         string;
  language:     string;
  description:  string;
  genre:        IGenre;
  movieTheater: ITheatre[];
}