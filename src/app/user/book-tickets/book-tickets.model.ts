import { FormControl } from "@angular/forms";
import { IShowTiming, ITheatre } from "src/app/shared";

 export interface IBookTicketForm{
    theater : FormControl<ITheatre | null>;
    showTiming: FormControl<IShowTiming | null>;
}