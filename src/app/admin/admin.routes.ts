import { Route } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { adminGuard, nonAdminGuard } from "../core";
import { Role } from "../shared";
import { GenreService } from "./genre";
import { TheatreService } from "./theatre";
import { MovieService } from "./movie/movie.service";

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
            providers:[MovieService],
            loadComponent : () => import("./dashboard/dashboard.component").then(c => c.DashboardComponent)
        },
        {
            path:"genre",
            providers:[GenreService],
            loadComponent : () => import("./genre/genre.component").then(c => c.GenreComponent)
        },
        {
            path:"theatre",
            providers:[TheatreService],
            loadComponent : () => import("./theatre/theatre.component").then(c => c.TheatreComponent)
        },
        {
            path:"movie",
            providers:[TheatreService,GenreService,MovieService],
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