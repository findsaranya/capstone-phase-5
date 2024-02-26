import { IAPIResponse, ITheatre } from "src/app/shared";

export interface ITheatrePayload extends ITheatre{    
}

export interface ITheatreResponse extends IAPIResponse<ITheatreData> {
    data:    ITheatreData;
}

export interface ITheatresList extends IAPIResponse< ITheatre[]>{
    data: ITheatre[]
}

export interface ITheatreData {
    theatreList: ITheatre[];
    totalItems:  number;
    totalPages:  number;
    currentPage: number;
}

export interface ITheatreListPayload{
    page:number;
    size:number
}

export interface ITheatreDeleteResponse extends IAPIResponse<string>{
    data : string;
}

export interface ITheatreModalData{
    theatreDetails:ITheatre,
    editMode:boolean;
}

