import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { IUserResponse } from './auth.model';
import { IUser, Role } from '../shared';

@Injectable()
export class AppInitService {
        private authService = inject(AuthService);
        private router = inject(Router);
         init():Promise<void>{
                return new Promise((resolve,reject) => {
                        const userId = this.authService.userId;
                        const adminId = this.authService.adminId;
                        const forkArr :Observable<IUser>[] = [];
                        if(userId){
                                forkArr.push( this.authService.getUser(userId));                           
                        }

                        if(adminId){
                                forkArr.push(this.authService.getAdmin(adminId))
                        }
                        if(forkArr.length){
                                forkJoin(forkArr).subscribe({
                                        next:(finalResponse) => {
                                                if(finalResponse.length){
                                                   finalResponse.forEach(eachResponse => {
                                                        if(eachResponse.role === Role.ADMIN){
                                                            this.authService.admin = eachResponse;
                                                            this.authService.changeAdminLoggedInStatus(true);
                                                        }
                                                        if(eachResponse.role === Role.USER){
                                                                this.authService.user = eachResponse;
                                                                this.authService.changeUserLoggedInStatus(true);
                                                        }

                                                   })
                                                }

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
