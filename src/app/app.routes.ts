import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path:"",
      loadChildren : () => import("./user/user.routes")
    },
    {
    path : 'admin',
    loadChildren : () => import("./admin/admin.routes")
},
{path: '**',loadComponent : () => import("./notfound/notfound.component").then(c => c.NotfoundComponent)} 
];