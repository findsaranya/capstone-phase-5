import { FormControl } from "@angular/forms";
import { IAPIResponse, IGenre } from "src/app/shared";



export interface IGenrePayload{
    name : string;
    id?:number;
}

export interface IGenreModalData extends IGenre{
    editMode : boolean;
}

export interface IGenreForm{
    genre : FormControl<string|null>,
    genreId : FormControl<number>
}

export interface IGenreListPayload{
    page:number;
    size:number
}

export interface IGenreListResponse extends IAPIResponse<IGenreData>{
    data : IGenreData
}

export interface IGenreByIdResponse extends IAPIResponse<IGenre>{
    data : IGenre
}

export interface IGenresList extends  IAPIResponse<IGenre[]>{
    data : IGenre[];
}

export interface IGenreData{
    totalItems:  number;
    totalPages:  number;
    genreList:   IGenre[];
    currentPage: number;
}