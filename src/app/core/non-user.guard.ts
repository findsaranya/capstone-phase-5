import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const nonUserGuard: CanActivateFn = (route, state) => {
    const authService:AuthService = inject(AuthService);
    const router :Router = inject(Router)
    const isUserLoggedIn = authService.userLoggedInOb$ ;
    console.log(isUserLoggedIn);
    if(!isUserLoggedIn){
        return true;
    }else{
        router.navigate(["/"]);
        return false;
    }
  };
  