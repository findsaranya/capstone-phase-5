import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AppInitService {
        private authService = inject(AuthService);
        private router = inject(Router);
         init():Promise<void>{
                return new Promise((resolve,reject) => {
                        const userId = this.authService.userId;
                        //const adminId = this.authService.adminId;
                        if(userId){
                         this.authService.getUser(userId).subscribe({
                                next : (response) => {
                                  this.authService.user = response;
                                  this.authService.changeUserLoggedInStatus(true);
                                  resolve();
                                },
                                error : resolve
                         })
                        }else{
                                resolve();
                        }
                       
                       

                })
                

        }
}
