import { Form, FormControl } from "@angular/forms";
import { IAPIResponse, IGenre, IMovie, ITheatre } from "src/app/shared";

export interface IMovieModalData{
    genreList :  IGenre[];
    theaterList : ITheatre[],
    formData : IMovie |null;
    isEditMode : boolean;
}

export interface IMovieForm {
    id :  FormControl<number>;
    name : FormControl<string>;
    language:FormControl<string>;
    description: FormControl<string>;
    genre:FormControl<IGenre | null>;
    movieTheater:FormControl<ITheatre[] | []>;

}

export interface IMovieResponse extends IAPIResponse<string> {
data :string;
}

export interface IRecentMovieResponse extends IAPIResponse<IMovie[]> {
    data :IMovie[];
    }

export interface IMovieData {
    movies: IMovie[];
    totalItems:  number;
    totalPages:  number;
    currentPage: number;
}

export interface IMovieListResponse extends IAPIResponse<IMovieData>{
    data : IMovieData;
}
export interface IMovieListPayload{
    page:number;
    size:number
}

export interface IGnereMoviesPayload extends IMovieListPayload {
    genre: IGenre;
   
}