import { FormControl } from "@angular/forms";
import { IAPIResponse, IUser } from "src/app/shared";

export interface IUserPayload{
    id : number;
    name: string;
    email: string;
    phoneNo:string;
    location:string;
    password :string; 
}

export interface IRegistrationForm{
    id : FormControl<number>;
    name: FormControl<string>;
    email: FormControl<string>;
    phoneNo: FormControl<string>;
    location:FormControl<string>;
    password :FormControl<string>; 
}

export interface IUserRegisterResponse extends IAPIResponse<IUser>{
  data : IUser;
}