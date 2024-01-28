import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AppInitService {
        private authService = inject(AuthService);
        private router = inject(Router);
         init():Promise<void>{
                return new Promise((resolve,reject) => {
                        const userToken = this.authService.userToken;
                        const adminToken = this.authService.adminToken;
                        console.log(userToken,adminToken);
                       // this.router.navigate(["/"]);
                        resolve();
                        // if(userToken){
                        //   this.authService.userLoggedIn.next(true);

                        //    resolve();
                        // }
                        // if(adminToken){
                        //   this.authService.adminLoggedIn.next(true);
                        //   resolve();
                        // }

                })
                

        }
}
