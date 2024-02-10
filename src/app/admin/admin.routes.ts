import { Route } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { adminGuard, nonAdminGuard } from "../core";
import { Role } from "../shared";

export default [{
    path: "",
    component: AdminComponent,
    canActivate:[adminGuard],
    data:{role : Role.ADMIN},
    children : [
        {
            path:"",
            pathMatch:"full",
            redirectTo:"/admin/dashboard"
        },
        {
            path:"dashboard",
            loadComponent : () => import("./dashboard/dashboard.component").then(c => c.DashboardComponent)
        },
        {
            path:"genre",
            loadComponent : () => import("./genre/genre.component").then(c => c.GenreComponent)
        },
        {
            path:"theatre",
            loadComponent : () => import("./theatre/theatre.component").then(c => c.TheatreComponent)
        },
        {
            path:"movie",
            loadComponent:() => import("./movie/movie.component").then(c=>c.MovieComponent)
        },
        {
            path:"logout",
            loadComponent:() => import("./logout/logout.component").then(c=>c.LogoutComponent)
        }

    ]
},
{
    path:"login",
    canActivate:[nonAdminGuard],
    loadComponent : () =>import("./login/login.component").then(c=>c.LoginComponent)
}
] satisfies Route[];