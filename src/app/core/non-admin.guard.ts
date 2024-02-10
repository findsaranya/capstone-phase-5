import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const nonAdminGuard: CanActivateFn = (route, state) => {
    const authService:AuthService = inject(AuthService);
    const router:Router = inject(Router);
    const isAdminLoggedIn = authService.adminLoggedInOb$ ;

    if(!isAdminLoggedIn){
      return true;
    }else{
      router.navigate(["/admin"])
      return false;
    }
  
  };
  