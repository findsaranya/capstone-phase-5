import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Role } from '../shared';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService);
  const isAdminLoggedIn = authService.adminLoggedInOb$ ;
  const role = authService.user?.role === Role.ADMIN || false;
  const isAdminAuthenticated = isAdminLoggedIn && role 
  return isAdminAuthenticated;
};
