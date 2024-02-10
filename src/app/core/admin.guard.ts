import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { Role } from '../shared';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService);
  const router:Router= inject(Router);
  const isAdminLoggedIn = authService.adminLoggedInOb$ ;
  const currentUserRole = authService.admin?.role || null;
  const expectedRole = route.data['role'];
  const isAdminAuthenticated = isAdminLoggedIn && currentUserRole === expectedRole
  if(isAdminAuthenticated){
    return true;
  }else{
  router.navigate(["/admin/login"]);
  return false;
  }
  
};
