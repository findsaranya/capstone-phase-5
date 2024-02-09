export interface ILoginForm {
    email : string;
    password:string;
}

export interface IUser{
    id:       number;
    role:     string;
    name:     string;
    email:    string;
    phoneNo:  string;
    location: string;
}

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface IAPIResponse{
    message: string;
    status:  number;
}