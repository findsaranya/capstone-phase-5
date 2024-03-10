import { FormControl } from "@angular/forms";

export interface IPaymentForm{
    total : FormControl<number>;
    cardNo: FormControl<string>;
    expiryDate :  FormControl<string>;
    cvv : FormControl<string>;
}