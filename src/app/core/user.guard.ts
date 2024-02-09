import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Role } from '../shared';

export const userGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService);
  const router :Router = inject(Router);
  const isUserLoggedIn = authService.userLoggedInOb$ ;
  const currentUserRole = authService.user?.role || null;
  const expectedRole = route.data['role'];
  const isUserAuthenticated = isUserLoggedIn && currentUserRole === expectedRole;
  if(isUserAuthenticated){
    return true;
  }else{
  router.navigate(["/login"]);
  return false;
  }
  
};
