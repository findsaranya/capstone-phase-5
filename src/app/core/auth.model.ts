import { IAPIResponse, IUser } from "src/app/shared";

export interface IUserResponse extends IAPIResponse{
    data:    IUser;
}
