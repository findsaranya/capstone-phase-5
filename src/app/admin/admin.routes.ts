import { Route } from "@angular/router";
import { AdminComponent } from "./admin.component";

export default [{
    path: "",
    component: AdminComponent,
    children : [
        // {
        //     path:"",
        //     pathMatch:"full",
        //     redirectTo:"/dashboard"
        // },
        {
            path:"",
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
    loadComponent : () =>import("./login/login.component").then(c=>c.LoginComponent)
}
] satisfies Route[];