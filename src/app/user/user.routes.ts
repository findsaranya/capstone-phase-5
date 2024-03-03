import { Route } from "@angular/router";
import { nonUserGuard, userGuard } from "../core";
import { Role } from "../shared";
import { RegisterService } from "./register";
import { GenreService } from "../admin/genre";
import { MovieService } from "../admin/movie";

export default [
    {
        path: "",
        loadComponent: () => import("./user.component").then(c => c.UserComponent),
        children : [
            {
                path:"",
                providers:[GenreService,MovieService],
                loadComponent : () => import("./home/home.component").then(c => c.HomeComponent),
                children:[
                    {
                     path:"",
                     loadComponent:() => import("./carousel/carousel.component").then(c => c.CarouselComponent)
                    },
                    {
                    path:"genre/:genreId",
                    loadComponent : () => import("./gere-movies/gere-movies.component").then(c => c.GereMoviesComponent)
                }]
            },
            {
                path:"login",
                canActivate:[nonUserGuard],
                loadComponent : () => import("./login/login.component").then(c => c.LoginComponent)
            },
            {
                path:"register",
                canActivate:[nonUserGuard],
                providers:[RegisterService],
                loadComponent : () => import("./register/register.component").then(c => c.RegisterComponent)
            },
            {
                path:"movies",
                canActivate:[userGuard],
                data:{role:Role.USER},
                loadComponent : () => import("./movies/movies.component").then(c=> c.MoviesComponent)
            },
            {
                path:"logout",
                canActivate:[userGuard],
                data:{role:Role.USER},
                loadComponent : () => import("./logout/logout.component").then(c=> c.LogoutComponent)
            }
        ]
    },
  
] satisfies Route[]