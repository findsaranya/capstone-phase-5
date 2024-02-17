import { FormControl } from "@angular/forms";
import { IAPIResponse } from "src/app/shared";

export interface IGenre{
    id:   number;
    name: string;
}

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

export interface IGenreListResponse extends IAPIResponse{
    data : IGenreData
}

export interface IGenreData{
    totalItems:  number;
    totalPages:  number;
    genreList:   IGenre[];
    currentPage: number;
}