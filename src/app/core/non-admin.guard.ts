import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./auth.service";

export const nonAdminGuard: CanActivateFn = (route, state) => {
    const authService:AuthService = inject(AuthService);
    const isAdminLoggedIn = authService.adminLoggedInOb$ ;
    
    return !isAdminLoggedIn ? true : false;
  };
  